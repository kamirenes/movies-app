
export const movieAge = [
  {
    movieId: '11',
    years: '19',
  },
  {
    movieId: '12',
    years: 5,
  },
  {
    movieId: '13',
    years: 0,
  },
  {
    movieId: '14',
    years: '9 goles',
  },
  {
    movieId: '21',
    years: 35,
  },
  {
    movieId: '22',
    years: ' 5',
  },
  {
    movieId: '23',
    years: 0,
  },
  {
    movieId: '24',
  },
  {
    movieId: '31',
    years: 22,
  },
  {
    movieId: '32',
    years: 5,
  },
  {
    movieId: '33',
    years: null,
  },
  {
    movieId: '34',
    years: 3,
  }
]

export const GENRE_ID = {
  adventures: 9,
  horror: 6,
  animation: 4,
  heroes: 1
}

export const GENRE_STRING = {
  [GENRE_ID.adventures]: 'ADV',
  [GENRE_ID.horror]: 'HOR',
  [GENRE_ID.animation]: 'ANI',
  [GENRE_ID.heroes]: 'HER',
}

export const disney = {
  id: '1',
  name: 'Disney studios',
  shortName: 'Disney',
  logo: 'https://cdn.mos.cms.futurecdn.net/qfFFFhnM8LwZnjpTECN3oB.jpg',
  money: 1000,
  movies: [
    {
      id: '11',
      name: 'Nightmare before christmas',
      genre: GENRE_ID.horror,
      img: 'https://www.dimanoinmano.it/img/638590/full/libri-per-ragazzi/infanzia/nightmare-before-christmas.jpg',
      price: 600,
    },
    {
      id: '12',
      name: 'Aladdin',
      genre: GENRE_ID.animation,
      url: 'https://www.lainformacion.com/files/article_default_content/uploads/2018/11/23/5bf84292d23b5.jpeg',
      price: 10000000000,
    },
    {
      id: '13',
      name: 'The avengers',
      genre: GENRE_ID.heroes,
      url: 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2b/The_Avengers_Poster.png/revision/latest?cb=20150610135853&path-prefix=es',
      price: 300,
    },
    {
      id: '14',
      name: 'John Carter',
      genre: GENRE_ID.adventures,
      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/John_carter_poster.jpg/220px-John_carter_poster.jpg',
      price: 400,
    },
  ]
}

export const warner = {
  id: '2',
  name: 'Warner Bros.',
  shortName: 'Warner',
  logo: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12c6f684-d447-4457-84fa-12033cfd581e/d9z4nxu-626ae303-e830-4b4f-ab8b-4aff7f1bef0f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyYzZmNjg0LWQ0NDctNDQ1Ny04NGZhLTEyMDMzY2ZkNTgxZVwvZDl6NG54dS02MjZhZTMwMy1lODMwLTRiNGYtYWI4Yi00YWZmN2YxYmVmMGYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gtKaGVrDg8gzU7QFThusbHJw2d6bKgnDauezUcZo-1A',
  money: 900,
  movies: [
    {
      id: '21',
      name: 'The conjuring',
      genre: GENRE_ID.horror,
      img: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg',
      price: 1000000000,
    },
    {
      id: '22',
      name: 'Space Jame',
      genre: GENRE_ID.animation,
      img: 'https://static.wikia.nocookie.net/warnerbros/images/d/d0/SpaceJam.jpg/revision/latest/scale-to-width-down/350?cb=20120727135751&path-prefix=es',
      price: 500,
    },
    {
      id: '23',
      name: 'The dark knight rises',
      genre: GENRE_ID.heroes,
      url: 'https://pics.filmaffinity.com/The_Dark_Knight_Rises-149544881-large.jpg',
      price: 400,
    },
    {
      id: '24',
      name: 'Fantastic beasts and where to find them',
      genre: GENRE_ID.adventures,
      img: 'https://i.pinimg.com/originals/11/95/b8/1195b802fe9108f0458830054ba1fd57.jpg',
      price: 500,
    },
  ]
}

export const sony = {
  id: '3',
  name: 'Sony Pictures',
  shortName: 'Sony',
  logo: 'https://logoeps.com/wp-content/uploads/2013/05/sony-pictures-entertainment-vector-logo.png',
  money: 700,
  movies: [
    {
      id: '31',
      name: 'Slender man',
      genre: GENRE_ID.horror,
      price: 700,
    },
    {
      id: '32',
      name: 'Spider-man into the spider-verse',
      genre: GENRE_ID.animation,
      price: 450,
    },
    {
      id: '33',
      name: 'Spider-man',
      genre: GENRE_ID.heroes,
      price: 500,
    },
    {
      id: '34',
      name: 'Last action hero',
      genre: GENRE_ID.adventures,
      price: 10000000000000,
    },
  ]
}

export const sonyImages = {
  31: 'https://m.media-amazon.com/images/M/MV5BMjE0MzcwMDAyNl5BMl5BanBnXkFtZTgwMzc4ODg0NDM@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
  32: 'https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_.jpg',
  33: 'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg',
  34: 'https://static.wikia.nocookie.net/ideas/images/0/0e/Last_action_hero_ver2.jpg/revision/latest/top-crop/width/360/height/450?cb=20180121010346',
}


export const studiosMap = {
  1: disney,
  2: warner,
  3: sony
}

export const GENRE_DETAILS = {
  [GENRE_ID.adventures]: {
    id: GENRE_ID.adventures,
    code: GENRE_STRING[GENRE_ID.adventures],
    name: "Adventures",
  },
  [GENRE_ID.horror]: {
    id: GENRE_ID.horror,
    code: GENRE_STRING[GENRE_ID.horror],
    name: "Horror",
  },
  [GENRE_ID.animation]: {
    id: GENRE_ID.animation,
    code: GENRE_STRING[GENRE_ID.animation],
    name: "Animation",
  },
  [GENRE_ID.heroes]: {
    id: GENRE_ID.heroes,
    code: GENRE_STRING[GENRE_ID.heroes],
    name: "Heroes",
  },
};
