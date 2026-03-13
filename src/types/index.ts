export interface CategoryScore {
  score: number;
  verdict: string;
  recommendations: string[];
}

export interface ActionItem {
  action: string;
  priority: 'urgent' | 'important' | 'bonus';
  effort: 'facile' | 'moyen' | 'difficile';
  impact: string;
}

export interface FunnelStep {
  rate: number;
  status: 'fort' | 'moyen' | 'faible';
  diagnosis: string;
  fix: string;
}

export interface ConversionFunnel {
  search_impressions: FunnelStep;
  search_to_click: FunnelStep;
  click_to_booking: FunnelStep;
  funnel_insight: string;
}

export interface ReviewInsight {
  theme: string;
  occurrences: number;
  severity: 'critique' | 'modéré' | 'mineur';
  example_quote: string;
  fix: string;
}

export interface ReviewInsights {
  summary: string;
  recurring_issues: ReviewInsight[];
  positive_highlights: string[];
}

export interface AnalysisResult {
  global_score: number;
  global_verdict: string;
  categories: {
    photos: CategoryScore;
    description: CategoryScore;
    reviews: CategoryScore;
    pricing: CategoryScore;
    amenities: CategoryScore;
  };
  action_plan: ActionItem[];
  conversion_funnel?: ConversionFunnel;
  review_insights?: ReviewInsights;
}

export interface ScrapedData {
  title: string;
  description: string;
  price_per_night: string;
  rating: number;
  review_count: number;
  amenities: string[];
  photo_count: number;
  photo_descriptions: string[];
  host_name: string;
  property_type: string;
  location: string;
  recent_reviews: string[];
}

export type AppState = 'landing' | 'loading' | 'results' | 'error';

export interface CategoryMeta {
  key: keyof AnalysisResult['categories'];
  name: string;
  icon: string;
  weight: string;
}
