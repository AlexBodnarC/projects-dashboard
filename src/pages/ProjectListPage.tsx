import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFavourites } from "../context/FavouritesContext";

interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  manager: string;
  favourite: boolean;
}

export const ProjectListPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const { toggleFavouritesUpdated } = useFavourites();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/projects");
        setProjects(response.data);
      } catch (err: any) {
        setError("Failed to fetch projects. Please try again later.");
        setShowSnackbar(true);
      }
    };

    fetchProjects();
  }, []);

  const toggleFavourite = async (id: string, favourite: boolean) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? { ...project, favourite: !favourite } : project
    );
    setProjects(updatedProjects);

    try {
      await axios.patch(`http://localhost:3001/projects/${id}`, {
        favourite: !favourite,
      });
      toggleFavouritesUpdated();
    } catch (err: any) {
      setError("Failed to update favourite status. Please try again.");
      setShowSnackbar(true);

      // Revert the optimistic UI update
      const revertedProjects = projects.map((project) =>
        project.id === id ? { ...project, favourite } : project
      );
      setProjects(revertedProjects);
    }
  };

  return (
    <div>
      <h1>Project List Page</h1>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "lightgrey" }}>
            <TableCell>Project ID</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Project Manager</TableCell>
            <TableCell>Favourite</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
              <TableCell>{project.manager}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color={project.favourite ? "error" : "success"}
                  onClick={() => toggleFavourite(project.id, project.favourite)}
                >
                  {project.favourite ? "Remove" : "Add"}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
