export interface MovieItemComplete {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieItem {
  id: number;
  title: string;
  poster: string;
  year: string;
  rating: number;
  language: string;
  overview: string;
}

export interface Response {
  page: number;
  results: MovieItemComplete[];
  total_pages: number;
  total_results: number;
}

export interface Actor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ActorInfo {
  name: string;
  char: string;
  profile: string;
}

export interface MovieDetail {}

export interface MoviePage {
  page: number;
  movies: MovieItem[];
}
