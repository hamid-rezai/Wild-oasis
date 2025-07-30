import styled from "styled-components";

const breakpoints = {
  md: "768px",
};

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;

    & > * {
      width: 100%;
      text-align: center;
    }
  }
  @media (min-width:400px) and (max-width: 900px) {
    flex-direction: column;
  }
`;

export default TableOperations;
