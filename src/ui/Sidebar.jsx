import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { HiOutlineX } from "react-icons/hi";

const StyledSidebar = styled.aside`
  position: relative;
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row:1/-1;
  display: flex ;
  flex-direction: column;
  gap:3.2rem;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 75vw;
    height: 100vh;
    z-index: 1000;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  }

`
const CloseButton = styled.button`
  display : none;
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 2.4rem;
    color: var(--color-grey-600);
    transition: color 0.3s;
    cursor: pointer;
  }
`

const Overlay = styled.div`
display:none;
@media (max-width:768px){
display: ${props => props.isOpen ? 'block' : 'none'};
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background-color: rgba(0, 0, 0, 0.4);
z-index: 900;
}
`
const Sidebar = ({isOpen,onClose}) => {
  return (
    <>
    <Overlay isOpen={isOpen} onClick={onClose}/>
    <StyledSidebar isOpen={isOpen} >
      {
        isOpen && <CloseButton onClick={onClose} aria-label="Close sidebar"><HiOutlineX/></CloseButton>
      }
    <Logo/>
    <MainNav/>
    </StyledSidebar>
    </>
  )
}
export default Sidebar;