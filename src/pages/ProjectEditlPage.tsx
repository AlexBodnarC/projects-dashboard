import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";
import { useFavourites } from "../context/FavouritesContext";
import { Notification } from "../ui/Notification";

export const ProjectEditPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { toggleFavouritesUpdated } = useFavourites();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/projects/${projectId}`
        );
        setProject(response.data);
        setLoading(false);
      } catch (err: any) {
        setError("Failed to load project details. Please try again.");
        setShowSnackbar(true);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/projects/${projectId}`, project);
      setSuccess("Project updated successfully!");
      setShowSnackbar(true);
      toggleFavouritesUpdated();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err: any) {
      setError("Failed to update project. Please try again.");
      setShowSnackbar(true);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!project) return <p>No project found.</p>;

  return (
    <div
      style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}
    >
      <Box
        component="form"
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "16px",
          maxWidth: "600px",
          width: "100%",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography sx={{ alignSelf: "center" }}>Project ID</Typography>
        <TextField value={projectId} disabled fullWidth />

        <Typography sx={{ alignSelf: "center" }}>Project Name</Typography>
        <TextField
          fullWidth
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
        />

        <Typography sx={{ alignSelf: "start" }}>Description</Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={project.description || ""}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />

        <Typography sx={{ alignSelf: "center" }}>Start Date</Typography>
        <TextField
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={project.startDate}
          onChange={(e) =>
            setProject({ ...project, startDate: e.target.value })
          }
        />

        <Typography sx={{ alignSelf: "center" }}>End Date</Typography>
        <TextField
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={project.endDate}
          onChange={(e) => setProject({ ...project, endDate: e.target.value })}
        />

        <Typography sx={{ alignSelf: "center" }}>Project Manager</Typography>
        <TextField
          fullWidth
          value={project.manager}
          onChange={(e) => setProject({ ...project, manager: e.target.value })}
        />

        <Box
          sx={{
            gridColumn: "1 / -1",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ padding: "8px 24px" }}
          >
            Update
          </Button>
        </Box>
      </Box>

      <Notification
        open={showSnackbar}
        message={error || success || ""}
        type={error ? "error" : "success"}
        onClose={() => setShowSnackbar(false)}
      />
    </div>
  );
};
