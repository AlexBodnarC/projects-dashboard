import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFavourites } from "../context/FavouritesContext";
import { Dot } from "lucide-react";

const StyledSidebar = styled.aside<{ isOpen: boolean }>`
  background: #f9f9f9;
  border-right: 1px solid #ddd;
  padding: 2.5rem;
  height: 100vh;
  transition: transform 0.3s ease, opacity 0.3s ease;
  position: relative;

  @media (max-width: 768px) {
    position: absolute;
    left: 0;
    top: 0;
    width: 16rem;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(-100%)"};
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
    z-index: 10;
    background: #f9f9f9;
    border-right: 1px solid #ddd;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const FavoriteList = styled.ul`
  margin-top: 0.5rem;
`;

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [favourites, setFavourites] = useState<any[]>([]);

  const { favouritesUpdated } = useFavourites();

  useEffect(() => {
    axios.get("http://localhost:3001/projects").then((response) => {
      const favouriteProjects = response.data.filter(
        (project: any) => project.favourite
      );
      setFavourites(favouriteProjects);
    });
  }, [favouritesUpdated]);

  return (
    <StyledSidebar isOpen={isOpen}>
      <h3>Favorite Projects</h3>
      <FavoriteList>
        {favourites.length > 0 ? (
          favourites.map((project: any) => (
            <li
              key={project.id}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1rem",
              }}
            >
              <Dot size={24} style={{ marginRight: "0.5rem" }} />
              {project.name}
            </li>
          ))
        ) : (
          <p style={{ marginTop: "1rem" }}>No favorite projects</p>
        )}
      </FavoriteList>
    </StyledSidebar>
  );
};

export default Sidebar;
