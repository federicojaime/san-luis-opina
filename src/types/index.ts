// src/types/index.ts
export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featured_image: string;
  featured_image_alt?: string;
  meta_title?: string;
  meta_description?: string;
  status: string;
  featured: boolean;
  views: number;
  published_at: string;
  published_at_formatted?: string;
  created_at: string;
  updated_at?: string;
  time_ago: string;
  author_name: string;
  author_bio?: string;
  category_name: string;
  category_slug: string;
  category_color: string;
  category_description?: string;
  tags?: Tag[];
  related_articles?: Article[];
  url: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  article_count: number;
  sort_order: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  name: string;
  slug: string;
  color: string;
}

export interface Sponsor {
  id: number;
  name: string;
  description: string;
  logo_url: string;
  website_url: string;
  priority: number;
}

export interface PromotionalModal {
  id: number;
  title: string;
  content: string;
  image_url: string;
  button_text: string;
  button_url: string;
  display_frequency: string;
  position: string;
  size: string;
  auto_close_seconds: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SiteStats {
  total_articles: number;
  total_categories: number;
  total_views: number;
  articles_today: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
  query?: string;
  total?: number;
}