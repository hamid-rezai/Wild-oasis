import { useMutation } from "@tanstack/react-query"
import Checkin from "../../pages/Checkin";

const useCheckin = () => {
  const {mutate: Checkin , isLoading: isCheckingIn} = useMutation();
  return (
    <div>
      
    </div>
  )
}

export default useCheckin
