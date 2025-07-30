import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Header from "./Header";
import { useState } from "react";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
  flex:1;
  @media (max-width: 1024px) {
    padding: 3rem 2.4rem 4.8rem;
  }
  @media (max-width: 768px) {
    padding:2rem 1.6rem;
  }
`;
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
  grid-template-rows: auto 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    
    }
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = ()=> setSidebarOpen((open)=> !open);

  return (
    <StyledAppLayout>
      <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen}/>
      <Sidebar isOpen={sidebarOpen} onClose={()=>setSidebarOpen(false)}/>
      <Main onClick={() => sidebarOpen && setSidebarOpen(false)}>  
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};
export default AppLayout;
