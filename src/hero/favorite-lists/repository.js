// Exercício refatorar para usar idb

// Está aqui só para simular o comportamento de ter acesso a um banco (firestore, localStorage, idb, etc)
function favoritesRepository() {
    const favoritesLists = [];

    function getFavoriteLists() {
        return favoritesLists;
    }

    function findList(listId) {
        const list = favoritesLists.find(
            ({ id: favoriteListId }) => favoriteListId === listId
        );
        return list;
    }

    function addFavorite(heroId, listId) {
        const list = findList(listId);
        const newHeroes = new Set([...list.heroes, heroId]);
        list.heroes = [...newHeroes];

        return list;
    }

    function removeFavorite(heroId, listId) {
        const list = findList(listId);
        const currentHeroes = new Set(list);
        currentHeroes.delete(heroId);

        return currentHeroes;
    }

    return {
        getFavoriteLists,
        addFavorite,
        removeFavorite,
    };
}

export { favoritesRepository };
