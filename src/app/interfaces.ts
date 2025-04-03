// interface used by multiple responses

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface ParentPlatform {
  platform: Platform;
}

// ----------------------------------------------- //

// response interface for all games

export interface Game {
  id: number;
  name: string;
  slug: string;
  released: string;
  background_image: string;
  rating: number;
  parent_platforms: ParentPlatform[];
  metacritic?: number;
}

export interface RawgApiResponse {
  count: number;
  results: Game[];
  next?: string;
  previous?: string;
}

// ------------------------------------------------------------ //

// response interface for game by id

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Store {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface GameResponse {
  id: number;
  name: string;
  name_original: string;
  slug: string;
  released: string;
  background_image: string;
  background_image_additional: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  added: number;
  playtime: number;
  suggestions_count: number;
  metacritic: number;
  metacritic_url: string;
  genres: Genre[];
  parent_platforms: ParentPlatform[];
  platforms: ParentPlatform[];
  stores: Store[];
  tags: Tag[];
  website: string;
  description: string;
  description_raw: string;
  reddit_url: string;
  reddit_count: number;
  developers: { id: number; name: string; slug: string }[];
  publishers: { id: number; name: string; slug: string }[];
  achievements_count: number;
  additions_count: number;
  alternative_names: string[];
  game_series_count: number;
  movies_count: number;
  screenshots_count: number;
  tba: boolean;
  updated: string;
}

// ----------------------------------------------------------//
