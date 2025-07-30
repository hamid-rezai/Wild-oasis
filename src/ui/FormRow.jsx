import React from 'react'
import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &>*{
      width: 100%;
    }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
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
    padding: 1.2rem 0;

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
