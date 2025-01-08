import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFavourites } from "../context/FavouritesContext";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DeleteConfirmationDialog } from "../ui/DeleteConfirmationDialog";
import { Notification } from "../ui/Notification";
import { Link } from "react-router-dom";
import { FavouriteToggle } from "../ui/FavouriteToggle";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
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

  const openDialog = (id: string) => {
    setProjectToDelete(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setProjectToDelete(null);
    setIsDialogOpen(false);
  };

  const deleteProject = async () => {
    if (!projectToDelete) return;

    try {
      await axios.delete(`http://localhost:3001/projects/${projectToDelete}`);
      setProjects(projects.filter((project) => project.id !== projectToDelete));
      closeDialog();
    } catch (err: any) {
      setError("Failed to delete the project. Please try again.");
      setShowSnackbar(true);
      closeDialog();
    }
  };

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

      const revertedProjects = projects.map((project) =>
        project.id === id ? { ...project, favourite } : project
      );
      setProjects(revertedProjects);
    }
  };

  const closeDialogDelete = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/projects/new`)}
        >
          Create Project
        </Button>
      </div>

      <h1>Project List Page</h1>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "lightgrey" }}>
            <TableCell>Project ID</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Project Manager</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <Link
                  to={`/projects/${project.id}`}
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  {project.id}
                </Link>
              </TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
              <TableCell>{project.manager}</TableCell>

              <TableCell style={{ display: "flex", gap: "8px" }}>
                <IconButton
                  color="error"
                  onClick={() => openDialog(project.id)}
                >
                  <Delete />
                </IconButton>

                <FavouriteToggle
                  isFavourite={project.favourite}
                  onToggle={() =>
                    toggleFavourite(project.id, project.favourite)
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/projects/${project.id}/edit`)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteConfirmationDialog
        open={isDialogOpen}
        projectId={projectToDelete}
        onConfirm={deleteProject}
        onCancel={closeDialogDelete}
        toggleFavouritesUpdated={toggleFavouritesUpdated}
      />

      <Notification
        open={showSnackbar}
        message={error || ""}
        type={error ? "error" : "success"}
        onClose={() => setShowSnackbar(false)}
      />
    </div>
  );
};
