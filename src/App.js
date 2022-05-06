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
    const favoritesRepository = createFavoriteRepository();
    const [heroes, setHeroes] = useState([]);
    const [favoriteLists, setFavoriteLists] = useState({});
    const [search, setSearch] = useState("");
    const marvelClient = createMarvelClient();

    const favoriteEditter = createFavoriteEditUseCase(
        favoritesRepository,
        favoriteLists
    );

    // HandleClick //
    const handleFavoritesClick = (hero) => {
        if (!favoriteLists.isFavorite(hero)) {
            const newLists = favoriteEditter.add(hero.id, CHUMBALIZED_LIST_ID);
            setFavoriteLists(newLists);
            setHeroes([...heroes]);
            return;
        }

        const newLists = favoriteEditter.remove(hero.id, CHUMBALIZED_LIST_ID);
        setFavoriteLists(newLists);
        setHeroes([...heroes]);
    };

    useEffect(() => {
        async function getFavoriteData() {
            const favoriteListData = favoritesRepository.getFavoriteLists();
            const heroesApiResult = await marvelClient.getHeroes();

            setHeroes(heroesApiResult.map((heroData) => createHero(heroData)));
            setFavoriteLists(createFavorites(favoriteListData));
        }

        getFavoriteData();
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
                                imgSrc={hero.imageSrc}
                                onClick={() => handleFavoritesClick(hero)}
                                btnText={
                                    favoriteLists.isFavorite(hero.id)
                                        ? "Remove"
                                        : "Add"
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
