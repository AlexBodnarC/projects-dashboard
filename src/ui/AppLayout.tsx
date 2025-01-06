import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  padding: 2rem;
  overflow: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100vh;
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 100;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.3rem 0.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
`;

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <ToggleButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
      </ToggleButton>
      <Overlay isVisible={isSidebarOpen} onClick={handleOverlayClick} />
      <StyledAppLayout>
        <Sidebar isOpen={isSidebarOpen} />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </>
  );
};

export default AppLayout;
