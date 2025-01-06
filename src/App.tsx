import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProjectListPage } from "./pages/ProjectListPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { FavouritesProvider } from "./context/FavouritesContext";

const App: React.FC = () => {
  return (
    <FavouritesProvider>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<ProjectListPage />} />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailPage />}
            />
          </Route>
        </Routes>
      </Router>
    </FavouritesProvider>
  );
};

export default App;
