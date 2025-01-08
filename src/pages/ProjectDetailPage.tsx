import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { FavouriteToggle } from "../ui/FavouriteToggle";
import { useFavourites } from "../context/FavouritesContext";

export const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toggleFavouritesUpdated } = useFavourites();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/projects/${projectId}`
        );
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project details", error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleBack = () => {
    navigate("/projects");
  };

  const handleEdit = () => {
    navigate(`/projects/${projectId}/edit`);
  };

  const toggleFavourite = async () => {
    if (!project) return;

    const updatedFavourite = !project.favourite;

    setProject({ ...project, favourite: updatedFavourite });

    try {
      await axios.patch(`http://localhost:3001/projects/${projectId}`, {
        favourite: updatedFavourite,
      });
      toggleFavouritesUpdated();
    } catch (error) {
      console.error("Failed to update favourite status", error);
      setProject({ ...project, favourite: project.favourite });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div
      style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}
    >
      <Box
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "1rem",
          maxWidth: "600px",
          width: "100%",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
          }}
        >
          <FavouriteToggle
            isFavourite={project.favourite}
            onToggle={toggleFavourite}
          />
        </Box>

        <Typography sx={{ alignSelf: "center" }}>Project ID</Typography>
        <Typography>{project.id}</Typography>

        <Typography sx={{ alignSelf: "center" }}>Project Name</Typography>
        <Typography>{project.name}</Typography>

        <Typography sx={{ alignSelf: "start" }}>Description</Typography>
        <Typography>{project.description}</Typography>

        <Typography sx={{ alignSelf: "center" }}>Start Date</Typography>
        <Typography>{project.startDate}</Typography>

        <Typography sx={{ alignSelf: "center" }}>End Date</Typography>
        <Typography>{project.endDate}</Typography>

        <Typography sx={{ alignSelf: "center" }}>Project Manager</Typography>
        <Typography>{project.manager}</Typography>

        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit
          </Button>
        </Box>
      </Box>
    </div>
  );
};
