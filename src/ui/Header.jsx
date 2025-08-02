import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const StyledHeader=styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media (min-width: 768px) {
        padding: 1.2rem 1.6rem;
        justify-content: flex-end;
        gap: 1rem;
    }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  `
const MenuButton = styled.button`
display: none;
  background: none;
  background:none;
  border: none;
  cursor: pointer;
  font-size: 2.4rem;
  @media (max-width: 768px) {
    display: block;
    margin-right: 1rem;
  }`
const Header=({onMenuClick , sidebarOpen})=>{
    return(
        <StyledHeader>
        <MenuButton onClick={onMenuClick} aria-label="Toggle menu">
            {sidebarOpen ? <HiOutlineX/> : <HiOutlineMenu/>}
            </MenuButton>
            <RightGroup>
            <UserAvatar />
        <HeaderMenu/>
            </RightGroup>
        </StyledHeader>
    )
}
export default Header;