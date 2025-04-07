export interface Genre {
  id: number;
  name: string;
}

export interface Platform {
  id: number;
  name: string;
}

export interface Store {
  id: number;
  name: string;
  url: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface ShortScreenshot {
  image: string;
}

export interface SearchInterface {
  added: number;
  added_by_status: string | null;
  background_image: string;
  clip: string | null;
  community_rating: number;
  dominant_color: string;
  esrb_rating: string | null;
  genres: Genre[];
  id: number;
  metacritic: number | null;
  name: string;
  parent_platforms: Platform[];
  platforms: Platform[];
  playtime: number;
  rating: number;
  rating_top: number;
  ratings: number[];
  ratings_count: number;
  released: string; // ISO string format
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  score: string;
  short_screenshots: ShortScreenshot[];
  slug: string;
  stores: Store[];
  suggestions_count: number;
  tags: Tag[];
  tba: boolean;
  updated: string; // ISO string format
  user_game: string | null;
}
