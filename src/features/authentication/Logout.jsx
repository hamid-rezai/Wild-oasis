import { HiArrowRight } from "react-icons/hi"
import { HiArrowRightOnRectangle } from "react-icons/hi2"
import ButtonIcon from "../../ui/ButtonIcon"
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
  const { logout, isLogingout } = useLogout();
  return (
    <ButtonIcon disabled={isLogingout} onClick={logout}>
      { !isLogingout ?
        <HiArrowRightOnRectangle/> : <SpinnerMini/>}
    </ButtonIcon>
  )
}

export default Logout;
