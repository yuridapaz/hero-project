function favorites(favoriteLists) {
    function addFavorite(favoritesHash, heroId, listId) {
        if (favoritesHash.has(heroId)) {
            const currentLists = favoritesHash.get(heroId);
            currentLists.add(id);
            favoritesHash.set(heroId, currentLists);
        } else {
            favoritesHash.set(heroId, new Set([id]));
        }

        return favoritesHash;
    }

    function removeFavorite(favoritesHash, heroId, listId) {
        const currentLists = favoritesHash.get(heroId);
        currentLists.delete(listId);
        favoritesHash.set(heroId, currentLists);

        return favoritesHash;
    }

    function buildFavoritesHash(favoriteLists) {
        const hash = new Map();

        favoriteLists.forEach(({ id, heroes }) => {
            heroes.forEach((heroId) => {
                addFavorite(hash, heroId, id);
            });
        });

        return hash;
    }

    const favoritesHash = buildFavoritesHash(favoriteLists);

    return {
        addFavorite: (heroId, listId) =>
            addFavorite(favoritesHash, heroId, listId),
        removeFavorite: (heroId, listId) =>
            removeFavorite(favoritesHash, heroId, listId),
        isFavorite: (heroId) => favoritesHash.has(heroId),
        getFavoritesLists: (heroId) => favoritesHash.get(heroId),
    };
}

export { favorites };
