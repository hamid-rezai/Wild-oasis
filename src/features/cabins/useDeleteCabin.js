import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";


  const useDeleteCabin = ()=>{

    const queryClient = useQueryClient();
  
    const { isPending:isDeleting, mutate:deleteCabin } = useMutation({
      mutationFn: deleteCabins,
      onSuccess:()=>{
        toast.success('Cabin successfully deleted');
        queryClient.invalidateQueries({queryKey:['cabins']});
      },
      onError:(error)=> toast.error(error.message)
    });
    return{isDeleting , deleteCabin};
  }
  export default useDeleteCabin;