import styled from "styled-components";

const StyledBurgerButton = styled.button`
  display:none;
  position:fixed;
  top:1rem;
  left:1rem;
  background: var(--color-grey-50);
  border: none;
  padding:0.6rem;
  border-radius: var(--border-radius-sm);
  z-index: 1001;

  svg {width:2rem ; height:2rem;
  }
  @media (max-width: 600px) {
    display:block;
  }
`;

const BurgerButton = ({children, onClick}) => {
  return (
    <StyledBurgerButton onClick={onClick}>
      {children}
    </StyledBurgerButton>
  );
}
export default BurgerButton;