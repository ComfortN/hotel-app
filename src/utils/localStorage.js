export const saveFavoritesToLocalStorage = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

export const clearFavoritesFromLocalStorage = () => {
    localStorage.removeItem('favorites');
};
