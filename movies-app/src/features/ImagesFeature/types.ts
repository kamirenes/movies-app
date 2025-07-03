export type Genre = {
  id: number;
  code: 'HOR' | 'ADV' | 'ANI' | 'HER';
  name: 'adventures' | 'horror' | 'animation' | 'heroes';
};

export type Movie = {
  id: string;
  name: string;
  img?: string;
  studioId: string;
  price: number;
  genre: number;
};

export type Studio = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  money: number;
};

export enum CardStyleEnum {
  REGULAR = 'regularCard',
  SMALL = 'smallCard',
}

export type CardStyle = CardStyleEnum;
