import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleGuest } from "../../services/apiGuests";

export function useSingleGuest() {
  const {guestId} = useParams();
  
  const {isPending , data:guest , error} = useQuery({
    queryKey:["guests",guestId],
    queryFn:()=>getSingleGuest(guestId),
    retry:false,
  })
  return{
    isPending,
    guest,
    error,
  }
}
