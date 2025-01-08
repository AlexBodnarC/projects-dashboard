import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ProjectListPage } from "./pages/ProjectListPage";
import { ProjectEditPage } from "./pages/ProjectEditlPage";
import { ProjectCreatePage } from "./pages/ProjectCreatePage";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { FavouritesProvider } from "./context/FavouritesContext";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

const App: React.FC = () => {
  return (
    <FavouritesProvider>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/projects/new" element={<ProjectCreatePage />} />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailPage />}
            />
            <Route
              path="/projects/:projectId/edit"
              element={<ProjectEditPage />}
            />
          </Route>
        </Routes>
      </Router>
    </FavouritesProvider>
  );
};

export default App;
