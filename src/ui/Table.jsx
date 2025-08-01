import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;

  @media (max-width:768px){
    & > [role="row"]:first-child {
      display: none;
    }
  }
  
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  padding: 1.2rem 2.4rem;

   @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;     /* one column */
    row-gap: 1rem;
    padding: 1.6rem;
    margin-bottom: 2rem;
    background: var(--color-grey-0);
    border-bottom: none;

    & > * {
      position: relative;
      padding-left: 9rem;
    }
    

     & > *::before {
      content: attr(data-label);
      position: absolute;
      left: 0.3rem;
      top: 50%;
      padding-right: 1rem;
      transform: translateY(-50%);
      font-weight: 600;
      color: var(--color-grey-500);
      white-space: nowrap;
    }
    }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  @media (max-width: 768px) {
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    >*:last-child{
      padding-left: 0;
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

const Table = ({columns , children})=>{
    return <TableContext.Provider value={{columns}}><StyledTable role="table">{children}</StyledTable></TableContext.Provider>
}

const Header=({children})=>{
  const {columns}= useContext(TableContext);
  return <StyledHeader columns={columns} role="row">{children}</StyledHeader>
}
const Row=({children})=>{
  const {columns}= useContext(TableContext);
  return <StyledRow columns={columns} role="row">{children}</StyledRow>
}
const Body=({data , render})=>{
  if(!data.length) return <Empty>No data to show at the moment</Empty>
  return <StyledBody>{data.map(render)}</StyledBody>
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
