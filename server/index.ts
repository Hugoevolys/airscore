import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { scrapeAirbnbListing } from './scraper.js';
import { analyzeListing } from './analyzer.js';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: corsOrigin === '*' ? true : corsOrigin.split(','),
  methods: ['GET', 'POST'],
}));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/analyze', async (req, res) => {
  const { url, metrics } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL manquante ou invalide.' });
  }

  if (!metrics || typeof metrics.impressions_rate !== 'number' || typeof metrics.search_to_click !== 'number' || typeof metrics.click_to_booking !== 'number') {
    return res.status(400).json({ error: 'Métriques de conversion manquantes ou invalides.' });
  }

  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.hostname.includes('airbnb')) {
      return res.status(400).json({ error: "L'URL doit être une annonce Airbnb valide." });
    }
  } catch {
    return res.status(400).json({ error: "L'URL fournie n'est pas valide." });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'Clé API Anthropic non configurée. Ajoutez ANTHROPIC_API_KEY dans .env' });
  }

  try {
    console.log(`[AirScore] Scraping: ${url}`);
    const scrapedData = await scrapeAirbnbListing(url);
    console.log('[AirScore] Scraping terminé, lancement de l\'analyse IA...');

    const analysis = await analyzeListing(scrapedData, metrics);
    console.log('[AirScore] Analyse terminée.');

    return res.json(analysis);
  } catch (error: any) {
    console.error('[AirScore] Erreur:', error.message);

    if (error.message.includes('Scrape') || error.message.includes('Jina')) {
      return res.status(502).json({
        error: "Impossible de récupérer cette annonce. Vérifiez que l'URL est bien une annonce Airbnb publique et réessayez.",
      });
    }

    if (error.message.includes('Claude') || error.message.includes('Anthropic')) {
      return res.status(502).json({
        error: "Erreur lors de l'analyse IA. Veuillez réessayer dans quelques instants.",
      });
    }

    return res.status(500).json({
      error: 'Une erreur inattendue est survenue. Veuillez réessayer.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`[AirScore] Serveur démarré sur le port ${PORT}`);
});
