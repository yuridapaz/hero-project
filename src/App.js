import React, { useEffect, useState } from 'react';
import * as C from './App.styled';
import './App.css';
import axios from 'axios';
import md5 from 'md5';

const publicKey = '04854623fbe7439566cb90a3600f4f50';
const privateKey = '10586cba00b02d11fccb1b9ca46bd6258f5b90d1';
const time = Number(new Date());
const hash = md5(time + privateKey + publicKey);

function App() {
  const [heroData, setHeroData] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [search, setSearch] = useState('');

  // HandleClick //
  const handleFavoritesClick = (hero) => {
    if (!favoriteList.includes(hero)) {
      addFavorite(hero);
      return;
    } else if (favoriteList.includes(hero)) {
      removeFavorite(hero);
      return;
    }
  };

  // Criar função ADD //
  const addFavorite = (hero) => {
    hero.isFav = true;
    console.log(hero);
    const newFavorites = [...favoriteList, hero];
    setFavoriteList(newFavorites);
  };

  // Criar função REMOVE //
  const removeFavorite = (hero) => {
    delete hero['isFav'];
    console.log(hero);
    const newFavorites = favoriteList.filter((fav) => fav.id !== hero.id);
    setFavoriteList(newFavorites);
  };

  useEffect(() => {
    axios
      .get(
        `https://gateway.marvel.com:443/v1/public/characters?ts=${time}&apikey=${publicKey}&hash=${hash}`
      )
      .then((res) => {
        setHeroData(res.data.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <C.HeaderDiv onChange={(e) => setSearch(e.target.value.toLowerCase())}></C.HeaderDiv>

      <C.ListNameStyled>Heroes List</C.ListNameStyled>
      <C.HeroDivStyled>
        {heroData
          .filter((hero) => {
            return hero.name.toLowerCase().includes(search);
          })
          .map((hero) => {
            return (
              <C.HeroCard
                key={hero.id}
                title={hero.name}
                imgSrc={hero.thumbnail.path}
                onClick={() => handleFavoritesClick(hero)}
                btnText={hero.isFav !== true ? 'Add' : 'Remove'}
                heartColor={hero.isFav && 'red'}
              />
            );
          })}
      </C.HeroDivStyled>

      <C.ListNameStyled>Favorites List</C.ListNameStyled>
      <C.HeroDivStyled>
        {favoriteList.map((hero) => {
          return (
            <C.HeroCard
              key={hero.id}
              title={hero.name}
              imgSrc={hero.thumbnail.path}
              onClick={() => handleFavoritesClick(hero)}
              btnText={hero.isFav !== true ? 'Add' : 'Remove'}
              heartColor={hero.isFav && 'red'}
            />
          );
        })}
      </C.HeroDivStyled>
    </>
  );
}

export default App;
