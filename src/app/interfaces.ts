export interface Game {
  id: number;
  name: string;
  slug: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic?: number;
}

export interface RawgApiResponse {
  count: number;
  results: Game[];
  next?: string;
  previous?: string;
}
