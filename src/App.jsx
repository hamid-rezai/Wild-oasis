import './App.css'
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

const H1 =styled.h1`font-size:2em ; 
  color:var(--color-brand-600);
  text-align:center;
  margin:0;
  padding:0;
  font-family: 'Courier New', Courier, monospace;
`;

function App() {

  return (
    <>
    <GlobalStyles/>
    <H1>
      hello world
    </H1>
    </>
  )
}

export default App
