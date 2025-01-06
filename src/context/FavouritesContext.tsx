import React, { createContext, useContext, useState } from "react";

interface FavouritesContextType {
  favouritesUpdated: boolean;
  toggleFavouritesUpdated: () => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favouritesUpdated, setFavouritesUpdated] = useState(false);

  const toggleFavouritesUpdated = () => {
    setFavouritesUpdated((prev) => !prev);
  };

  return (
    <FavouritesContext.Provider
      value={{ favouritesUpdated, toggleFavouritesUpdated }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
