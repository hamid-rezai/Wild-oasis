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
        padding: 1.6rem 2rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    padding: 2rem;
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
