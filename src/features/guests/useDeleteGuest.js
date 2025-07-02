import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuests } from "../../services/apiGuests";
import toast from "react-hot-toast";


  const useDeleteGuest = ()=>{

    const queryClient = useQueryClient();
  
    const { isPending:isDeleting, mutate:deleteGuest } = useMutation({
      mutationFn: deleteGuests,
      onSuccess:()=>{
        toast.success('Guest successfully deleted');
        queryClient.invalidateQueries({queryKey:['guests']});
      },
      onError:(error)=> toast.error(error.message)
    });
    return{isDeleting , deleteGuest};
  }
  export default useDeleteGuest;