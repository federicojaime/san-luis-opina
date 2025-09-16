// src/lib/api.ts
import { Article, Category, Sponsor, PromotionalModal, SiteStats, ApiResponse } from '@/types';

// CAMBIAR ESTA URL POR TU DOMINIO REAL
const BASE_URL = 'http://localhost/back-SLO/public/api';

class ApiClient {
  private async fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Homepage APIs
  async getLatestNews(limit: number = 8): Promise<Article[]> {
    const response = await this.fetchData<Article[]>(`/latest?limit=${limit}`);
    return response.data;
  }

  async getFeaturedArticle(): Promise<Article | null> {
    const response = await this.fetchData<Article>('/featured');
    return response.data;
  }

  // News & Articles
  async getAllNews(params: {
    page?: number;
    limit?: number;
    category?: string;
    featured?: boolean;
    search?: string;
  } = {}): Promise<ApiResponse<Article[]>> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    return await this.fetchData<Article[]>(`/news?${queryParams.toString()}`);
  }

  async getArticle(slug: string): Promise<Article> {
    const response = await this.fetchData<Article>(`/article/${slug}`);
    return response.data;
  }

  // Search & Categories
  async searchArticles(query: string, limit: number = 10): Promise<{
    articles: Article[];
    total: number;
    query: string;
  }> {
    const response = await this.fetchData<Article[]>(`/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    return {
      articles: response.data,
      total: response.total || 0,
      query: response.query || query
    };
  }

  async getCategories(): Promise<Category[]> {
    const response = await this.fetchData<Category[]>('/categories');
    return response.data;
  }

  // Site Data
  async getSiteStats(): Promise<SiteStats> {
    const response = await this.fetchData<SiteStats>('/stats');
    return response.data;
  }

  async getSponsors(): Promise<Sponsor[]> {
    const response = await this.fetchData<Sponsor[]>('/sponsors');
    return response.data;
  }

  // Marketing & Engagement
  async getPromotionalModal(): Promise<PromotionalModal | null> {
    const response = await this.fetchData<PromotionalModal>('/promotional-modal');
    return response.data;
  }

  async subscribeNewsletter(email: string, name?: string): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return false;
    }
  }
}

export const apiClient = new ApiClient();