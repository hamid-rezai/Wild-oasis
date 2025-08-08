import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
      transition: background-color 0.3s;
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({filterField , options}) {
  const [searchParams , setSearchParams] =useSearchParams();
  const defaultValue = options[0].value;
  const current = searchParams.get(filterField) ?? defaultValue;
  function handleClick(value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === defaultValue) {
      params.delete(filterField);
    } else {
      params.set(filterField, value);
    }
    params.set("page", "1");

    setSearchParams(params, { replace: true });
  }

  return (
    <StyledFilter>
      {options.map((option)=>(
      <FilterButton key={option.value} onClick={()=>handleClick(option.value)} active={option.value === current}>{option.label}</FilterButton>
      )
      )}
      
    </StyledFilter>
  );
}

export default Filter;
