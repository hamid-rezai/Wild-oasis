import { HiArrowRightOnRectangle } from "react-icons/hi2"
import { useUser } from "./useUser";
import { useLogout } from "./useLogout";
import { useState } from "react";

import ButtonIcon from "../../ui/ButtonIcon"
import ConfirmLogout from "../../ui/ConfirmLogout";
import Backdrop from "../../ui/Backdrop";

const Logout = () => {
  const { logout, isLogingout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useUser();
    const {fullName} = user.user_metadata;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };
  return (
    <>
    <ButtonIcon disabled={isLogingout} onClick={()=> setIsOpen(true)}>
      <HiArrowRightOnRectangle/> 
    </ButtonIcon>

      { isOpen && (
        <Backdrop onClick={() => setIsOpen(false)}>
          <ConfirmLogout resourceName={fullName} onConfirm={handleLogout} onClose={()=>setIsOpen(false)}/>
        </Backdrop>
      )
      
      }
      </>
  )
}

export default Logout;
