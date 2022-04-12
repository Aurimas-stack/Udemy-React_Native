import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  favorites: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

const FavoritesContextProvider = (props) => {
  const [ids, setIds] = useState([]);

  const addFavorite = (id) => {
    setIds((prevIds) => {
      return [...prevIds, id];
    });
  };

  const removeFavorite = (id) => {
    setIds((prevIds) => {
      return prevIds.filter((prevId) => prevId !== id);
    });
  };

  const value = {
    favorites: ids,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
