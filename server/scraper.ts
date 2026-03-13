/**
 * Scrape une annonce Airbnb via Jina AI Reader et pré-analyse le contenu
 * pour enrichir le contexte envoyé à Claude.
 */

interface ScrapedData {
  markdown: string;
  meta: {
    photoCountVisible: number;
    hasShowAllPhotosButton: boolean;
    rating: number | null;
    reviewCount: number | null;
    hostName: string | null;
    isSuperhost: boolean;
    isGuestFavorite: boolean;
    propertyType: string | null;
    location: string | null;
    amenitiesCount: number;
    amenitiesList: string[];
  };
}

export async function scrapeAirbnbListing(url: string): Promise<ScrapedData> {
  const jinaUrl = `https://r.jina.ai/${url}`;

  try {
    const response = await fetch(jinaUrl, {
      headers: {
        Accept: 'text/markdown',
        'X-Return-Format': 'markdown',
      },
    });

    if (!response.ok) {
      throw new Error(`Jina Reader: HTTP ${response.status}`);
    }

    const markdown = await response.text();

    if (!markdown || markdown.length < 200) {
      throw new Error('Jina Reader: contenu insuffisant récupéré — l\'annonce est peut-être inaccessible');
    }

    // Pré-analyse du contenu pour corriger les biais de scraping
    const meta = extractMeta(markdown);

    return { markdown, meta };
  } catch (error: any) {
    throw new Error(`Scrape error: ${error.message}`);
  }
}

function extractMeta(md: string) {
  // Compter les vraies photos du bien (pas les icônes/assets Airbnb)
  const photoUrls = md.match(/muscache\.com\/im\/pictures\/(hosting|miso)\//g);
  const photoCountVisible = photoUrls ? photoUrls.length : 0;

  // Détecte si le bouton "Afficher toutes les photos" existe (= il y en a plus)
  const hasShowAllPhotosButton = /afficher toutes les photos/i.test(md);

  // Note moyenne
  const ratingMatch = md.match(/(\d[,.]\d{1,2})\s*étoile/i) || md.match(/(\d[,.]\d{1,2})\s*star/i);
  const rating = ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : null;

  // Nombre de commentaires
  const reviewMatch = md.match(/(\d+)\s*commentaire/i) || md.match(/(\d+)\s*review/i);
  const reviewCount = reviewMatch ? parseInt(reviewMatch[1]) : null;

  // Nom de l'hôte
  const hostMatch = md.match(/Hôte\s*:\s*(\w+)/i) || md.match(/Hosted by\s*(\w+)/i);
  const hostName = hostMatch ? hostMatch[1] : null;

  // Superhôte
  const isSuperhost = /superhôte|superhost/i.test(md);

  // Coup de cœur / Guest Favorite
  const isGuestFavorite = /coup de cœur|guest favorite/i.test(md);

  // Type de bien
  const propertyMatch = md.match(/logement entier\s*:\s*([^-–\n]+)/i);
  const propertyType = propertyMatch ? propertyMatch[1].trim() : null;

  // Localisation
  const locationMatch = md.match(/(?:à|in)\s+([A-ZÀ-Ü][a-zà-ü]+(?:[\s-][A-ZÀ-Ü][a-zà-ü]+)*),\s*([A-ZÀ-Ü][a-zà-ü]+(?:[\s-][A-ZÀ-Ü][a-zà-ü]+)*)/);
  const location = locationMatch ? `${locationMatch[1]}, ${locationMatch[2]}` : null;

  // Équipements — cherche la section des équipements
  const amenitiesList: string[] = [];
  // Capture les lignes qui ressemblent à des équipements listés
  const amenityMatches = md.match(/(?:^|\n)\s*(?:\*\s+|[-•]\s+)([A-ZÀ-Üa-zà-ü][\w\sà-ü''éèêëïîôùûç&/]+)/gm);
  if (amenityMatches) {
    for (const match of amenityMatches) {
      const cleaned = match.replace(/^\s*[\*\-•]\s+/, '').trim();
      if (cleaned.length > 2 && cleaned.length < 60) {
        amenitiesList.push(cleaned);
      }
    }
  }

  return {
    photoCountVisible,
    hasShowAllPhotosButton,
    rating,
    reviewCount,
    hostName,
    isSuperhost,
    isGuestFavorite,
    propertyType,
    location,
    amenitiesCount: amenitiesList.length,
    amenitiesList: amenitiesList.slice(0, 40), // cap pour pas surcharger le prompt
  };
}
