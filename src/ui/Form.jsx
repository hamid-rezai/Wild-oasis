import styled, { css } from "styled-components";

const Form = styled.form.attrs((props) => ({ type: props.type || "regular" }))`
  ${(props) =>
    props.type === "regular" &&
    css`
       width: 100%;
+      max-width: 64rem;      
+      margin: 0 auto;
+      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media (max-width: 768px) {
        padding: 2rem 2rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100%;
      max-width: 80rem;
      margin: 0 auto;
      background-color: var(--color-grey-0);
      border-radius: var(--border-radius-md);
      padding: 4rem 10rem;

      @media (max-width: 768px) {
        padding: 2rem 4rem;
        font-size: 1.2rem;
      }
    `}
      overflow-x: auto;
  font-size: 1.4rem;
`;

export default Form;
