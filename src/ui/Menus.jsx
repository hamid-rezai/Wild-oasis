import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  transform-origin: top right;

  transition: none !important;

  transform: translateX(-100%);
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;
  white-space: nowrap;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState();
  const [position, setPosition] = useState();

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, open, close, setPosition, position }}>
      {children}
    </MenusContext.Provider>
  );
}
function Toggle({ id }) {
  const btnRef = useRef();
  const { openId, open, close, setPosition } =
    useContext(MenusContext);

  const syncPosition = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPosition({ x: rect.right, y: rect.bottom + 8 });
  };
  useEffect(() => {
    if (openId === id) {
      syncPosition();
      // then subscribe
      window.addEventListener("scroll", syncPosition, true);
      window.addEventListener("resize", syncPosition);
      return () => {
        window.removeEventListener("scroll", syncPosition, true);
        window.removeEventListener("resize", syncPosition);
      };
    }
  }, [openId, id]);

  const handleClick = (e) => {
    e.stopPropagation();
    const btn = e.target.closest("button");
    const rect = btn.getBoundingClientRect();
    setPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle ref={btnRef} onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { close } = useContext(MenusContext);
  const ref = useOutsideClick(() => {
    console.log("close from click outside");
    close();
  }, false);

  const { openId, position } = useContext(MenusContext);
  if (openId !== id) return null;
  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  const handleClick = (e) => {
    close();
    onClick(e);
  };
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span> {children} </span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
