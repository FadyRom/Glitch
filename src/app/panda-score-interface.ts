export interface MatchResponse {
  begin_at: string;
  detailed_stats: boolean;
  draw: boolean;
  end_at: string | null;
  forfeit: boolean;
  game_advantage: number | null;
  games: Game[];
  id: number;
  league: League;
  league_id: number;
  live: {
    opens_at: string | null;
    supported: boolean;
    url: string | null;
  };
  match_type: string;
  modified_at: string;
  name: string;
  number_of_games: number;
  opponents: OpponentWrapper[];
  original_scheduled_at: string;
  rescheduled: boolean;
  results: Result[];
  scheduled_at: string;
  serie: Serie;
  serie_id: number;
  slug: string;
  status: string;
  streams_list: Stream[];
  tournament: Tournament;
  tournament_id: number;
  videogame: Videogame;
  videogame_title: VideogameTitle;
  videogame_version: any;
  winner: Team | null;
  winner_id: number | null;
  winner_type: string;
}

export interface Game {
  begin_at: string | null;
  complete: boolean;
  detailed_stats: boolean;
  end_at: string | null;
  finished: boolean;
  forfeit: boolean;
  id: number;
  length: number | null;
  match_id: number;
  position: number;
  status: string;
  winner: TeamWrapper;
  winner_type: string;
}

export interface TeamWrapper {
  id: number | null;
  type: string;
}

export interface League {
  id: number;
  image_url: string;
  modified_at: string;
  name: string;
  slug: string;
  url: string;
}

export interface OpponentWrapper {
  type: string;
  opponent: Team;
}

export interface Team {
  acronym: string;
  id: number;
  image_url: string;
  location: string;
  modified_at: string;
  name: string;
  slug: string;
}

export interface Result {
  score: number;
  team_id: number;
}

export interface Serie {
  begin_at: string;
  end_at: string;
  full_name: string;
  id: number;
  league_id: number;
  modified_at: string;
  name: string;
  season: string | null;
  slug: string;
  winner_id: number | null;
  winner_type: string;
  year: number;
}

export interface Stream {
  embed_url: string;
  language: string;
  main: boolean;
  official: boolean;
  raw_url: string;
}

export interface Tournament {
  begin_at: string;
  country: string | null;
  detailed_stats: boolean;
  end_at: string;
  has_bracket: boolean;
  id: number;
  league_id: number;
  live_supported: boolean;
  modified_at: string;
  name: string;
  prizepool: string | null;
  region: string;
  serie_id: number;
  slug: string;
  tier: string;
  type: string;
  winner_id: number | null;
  winner_type: string;
}

export interface Videogame {
  id: number;
  name: string;
  slug: string;
}

export interface VideogameTitle {
  id: number;
  name: string;
  slug: string;
  videogame_id: number;
}
