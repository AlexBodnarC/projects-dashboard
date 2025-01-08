import React from "react";
import { IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface FavouriteToggleProps {
  isFavourite: boolean;
  onToggle: () => void;
}

export const FavouriteToggle: React.FC<FavouriteToggleProps> = ({
  isFavourite,
  onToggle,
}) => {
  return (
    <IconButton color={isFavourite ? "error" : "default"} onClick={onToggle}>
      {isFavourite ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};
