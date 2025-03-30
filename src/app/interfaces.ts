export interface Parent_Platforms {
  platform: { id: 1; name: string; slug: string };
}

export interface Game {
  id: number;
  name: string;
  slug: string;
  released: string;
  background_image: string;
  rating: number;
  parent_platforms: Parent_Platforms[];
  metacritic?: number;
}

export interface RawgApiResponse {
  count: number;
  results: Game[];
  next?: string;
  previous?: string;
}
