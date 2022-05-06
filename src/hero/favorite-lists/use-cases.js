function favoriteEdit(favoritesRepository, favorites) {
    return {
        add: (heroId, listId) => {
            favorites.addFavorite(heroId, listId);
            favoritesRepository.removeFavorite(heroId, listId);

            return favorites;
        },
        remove: (heroId, listId) => {
            favorites.removeFavorite(heroId, listId);
            favoritesRepository.removeFavorite(heroId, listId);

            return favorites;
        },
    };
}

export { favoriteEdit };
