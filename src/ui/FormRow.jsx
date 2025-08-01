import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  padding: 1rem 4rem;
  line-height: 1.3;
  border-bottom: 1px solid var(--color-grey-100);

  &>*{
      width: 100%;
    }

  &:first-child {
    padding-top: 2rem;
  }

  &:last-child {
    padding-bottom: 2rem;
    border-bottom: none;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 24rem 1fr auto;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 2rem;

    /* only make the “actions” row flex */
    &:has(button) {
      display: flex;
      justify-content: flex-end;
      gap: 1.2rem;
    }
    & > * {
      width: auto;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRow = ({label , error,children}) => {
  return (
    
      <StyledFormRow>
        {label && <Label htmlFor={children.props.id}>{label}</Label>}
        {children}
        {error && <Error>{error}</Error>}
      </StyledFormRow>
  )
}

export default FormRow;
