import { FaUsersLine } from "react-icons/fa6";
import { HiOutlineHome, HiOutlineUsers } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: color 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const MainNav = () => {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to='/dashboard'>
            {" "}
            <HiOutlineHome /> <span>Home</span>{" "}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/bookings'>
            {" "}
            <HiOutlineCalendarDays /> <span>Bookings</span>{" "}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/guests'>
            {" "}
            <FaUsersLine /> <span>Guests</span>{" "}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/cabins'>
            {" "}
            <HiOutlineHomeModern /> <span>Cabins</span>{" "}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/users'>
            {" "}
            <HiOutlineUsers /> <span>Users</span>{" "}
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/settings'>
            {" "}
            <HiOutlineCog6Tooth /> <span>Settings</span>{" "}
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
};

export default MainNav;
