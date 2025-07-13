/**
 * Recipe data structure (returned from API)
 * Contains recipe details and metadata
 */
export interface Recipe {
    id: number;
    title: string;
    ingredients: string[];
    instructions: string;
    favorited_by: string[];
    created_at: string;
    updated_at: string;
    user_id: number;
  }
  