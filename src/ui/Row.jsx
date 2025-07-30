import styled, { css } from "styled-components";


const Row = styled.div.attrs(props =>({
  type:props.type || "vertical",
}))`
  display:flex;
  flex-direction: column;
  gap: 1.6rem;

  ${(props)=>props.type === "horizontal" && 
  css`
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0; 
      }
  
  `}


  ${(props)=>props.type === "vertical" && 
  css`
  flex-direction: column;
  gap: 1.6rem;
  `}

`;



export default Row;