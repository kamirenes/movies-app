export type TMovie = {
  id: string;
  name: string;
  img?: string;
  studioId: string;
  position: string;
};

export type TStudio = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  money: number;
};

export enum CardStyleEnum {
  REGULAR = 'regularCard',
  SMALL = 'smallCard'
}

export type TCardStyle = CardStyleEnum