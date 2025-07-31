import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmLogout = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background-color: var(--color-grey-0);
  padding: 3rem 6rem;
  border-radius: var(--border-radius-md);

  @media (max-width: 768px) {
    width: 30rem; 
    padding: 2rem 4rem;
   }
  @media (min-width:768px) and (max-width: 1024px) {
    width: 40rem;
  }

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmLogout({ resourceName, onConfirm, disabled , onClose }) {
  return (
    <StyledConfirmLogout>
      <Heading as="h3">Log out  "{resourceName}"</Heading>
      <p>
        Are you sure you want to log out from {resourceName} account ?
      </p>

      <div>
        <Button onClick={onClose} variation="secondary" disabled={disabled}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variation="danger" disabled={disabled}>
          Logout
        </Button>
      </div>
    </StyledConfirmLogout>
  );
}

export default ConfirmLogout;
