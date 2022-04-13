import React, { useEffect, useState } from "react";
import { favoritesRepository as createFavoriteRepository } from "./hero/favorite-lists/repository";
import { favoriteEdit as createFavoriteEditUseCase } from "./hero/favorite-lists/use-cases";
import { favorites as createFavorites } from "./hero/favorite-lists";
import { marvelClient as createMarvelClient } from "./hero/marvel-client";
import * as C from "./App.styled";
import "./App.css";
import { createHero } from "./hero";

const CHUMBALIZED_LIST_ID = "My Favorites";

function App() {
    const [heroes, setHeroes] = useState([]);
    const [favoriteLists, setFavoriteLists] = useState({});
    const [search, setSearch] = useState("");
    const marvelClient = createMarvelClient();
    const favoritesRepository = createFavoriteRepository();
    const favoriteEditter = createFavoriteEditUseCase(
        favoritesRepository,
        favoriteLists
    );

    // HandleClick //
    const handleFavoritesClick = (hero) => {
        if (!favoriteList.includes(hero)) {
            const newLists = favoriteEditter.add(hero, CHUMBALIZED_LIST_ID);
            setFavoriteLists(newLists);
            return;
        }

        const newLists = removeFavorite(hero, CHUMBALIZED_LIST_ID);
        setFavoriteLists(newLists);
    };

    useEffect(async () => {
        const favoriteListData = favoritesRepository.getFavoriteLists();
        favoriteLists = createFavorites(favoriteListData);
        const heroes = await marvelClient
            .getHeroes()
            .map((heroData) => createHero(heroData));
        setHeroes(heroes);
        setFavoriteLists(favoriteLists);
    }, []);

    return (
        <>
            <C.HeaderDiv
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
            ></C.HeaderDiv>

            <C.ListNameStyled>Heroes List</C.ListNameStyled>
            <C.HeroDivStyled>
                {heroes
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
                                btnText={
                                    favoriteLists.isFavorite(hero.id)
                                        ? "Add"
                                        : "Remove"
                                }
                                heartColor={
                                    favoriteLists.isFavorite(hero.id) && "red"
                                }
                            />
                        );
                    })}
            </C.HeroDivStyled>
        </>
    );
}

export default App;
