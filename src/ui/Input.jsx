import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  font-size: 1.4rem;
  width: 100%;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
  }
  
`;
export default Input;
