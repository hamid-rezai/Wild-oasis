import styled, { css } from "styled-components";

const breakpoints={
  sm: "480px",
  md: "768px",
  lg: "1024px"
}; "styled-components";
const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button.attrs(props => ({
  size:props.size || 'medium',
  variation:props.variation || 'primary',
  fullWidth: props.fullWidth || false,
}))`
  border:none;
  border-radius:var(--border-radious-sm);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  display: inline-block;
  text-align: center;
  
  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}

  ${(props) => props.fullWidth && css`
    width: 100%;
  `}
  font-size: clamp(1rem, 2.5vw, 1.6rem);
  padding: clamp(0.6rem, 2vw, 1.2rem) clamp(1rem, 4vw, 2.4rem);

   @media (max-width: ${breakpoints.sm}) {
     font-size: ${props => props.size === 'small' ? '1rem' : '1.2rem'};
    padding: ${props => props.size === 'small' ? '0.6rem 1rem' : '0.8rem 1.2rem'};
  }
  @media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
    font-size: ${props => props.size === 'small' ? '1.2rem' : props.size === 'medium' ? '1.4rem' : '1.6rem'};
    padding: ${props => props.size === 'small' ? '0.6rem 1rem' : props.size === 'medium' ? '1rem 1.6rem' : '1.2rem 2.4rem'};
  }
  @media (min-width: ${breakpoints.lg}) {
    font-size: ${props => props.size === 'small' ? '1.4rem' : props.size === 'medium' ? '1.6rem' : '1.8rem'};
    padding: ${props => props.size === 'small' ? '0.8rem 1.2rem' : props.size === 'medium' ? '1.2rem 2rem' : '1.4rem 2.8rem'};
  }
  
`;

export default Button;
