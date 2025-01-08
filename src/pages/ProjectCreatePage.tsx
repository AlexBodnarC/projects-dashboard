import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";
import { Notification } from "../ui/Notification";

export const ProjectCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    id: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    manager: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    name: "",
    manager: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCreate = async () => {
    let hasErrors = false;
    const newErrors = { id: "", name: "", manager: "" };

    if (!project.id) {
      newErrors.id = "Project ID is required.";
      hasErrors = true;
    }

    if (!project.name) {
      newErrors.name = "Project Name is required.";
      hasErrors = true;
    }

    if (!project.manager) {
      newErrors.manager = "Project Manager is required.";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    try {
      await axios.post("http://localhost:3001/projects", project);
      setSuccess("Project created successfully!");
      setShowSnackbar(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err: any) {
      setError("Failed to create project. Please try again.");
      setShowSnackbar(true);
    }
  };

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
        <TextField
          fullWidth
          value={project.id}
          onChange={(e) => setProject({ ...project, id: e.target.value })}
          error={!!errors.id}
          helperText={errors.id}
        />

        <Typography sx={{ alignSelf: "center" }}>Project Name</Typography>
        <TextField
          fullWidth
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
        />

        <Typography sx={{ alignSelf: "start" }}>Description</Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={project.description}
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
          error={!!errors.manager}
          helperText={errors.manager}
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
            onClick={handleCreate}
            sx={{ padding: "8px 24px" }}
          >
            Create
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
