import styled from "styled-components";

const Backdrop = styled.div`
position: fixed;
top: 0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
z-index: 999;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  transition: all 0.5s;
`

export default Backdrop;