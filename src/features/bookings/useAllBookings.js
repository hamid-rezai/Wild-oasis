import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

const useAllBookings = ()=>{
const {isPending : isLoading, data:bookings , error} = useQuery({
    queryKey:['bookings'],
    queryFn: getAllBookings,
  })
  return {isLoading , bookings,error};
}
export default useAllBookings;