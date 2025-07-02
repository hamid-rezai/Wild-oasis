import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import styled from "styled-components";

  const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 0.4rem;
  color: ${(props)=>(props.success ? "var(--color-green-800)" : "var(--color-red-700)")};
  font-size: 1.6rem;
`;

const TickOrCross = ({hasBooking})=>{
return(
  <IconWrapper success={hasBooking}>
    {hasBooking ? <HiCheckCircle/> : <HiXCircle/>}
  </IconWrapper>
)
}
export default TickOrCross;