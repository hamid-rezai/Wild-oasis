import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

const useCabins=()=>{
  const {isPending : isLoading, data:cabins , error} = useQuery({
    queryKey:['cabins'],
    queryFn: getCabins,
  })
  return {isLoading , cabins,error};
}
export default useCabins;