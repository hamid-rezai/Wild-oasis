import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditGuests } from "../../services/apiGuests";

const useCreateGuest = () => {

  const queryClient = useQueryClient();
  const {mutate:createGuests , isPending:isCreating} = useMutation({
    mutationFn: createEditGuests,
    onSuccess:()=>{
      toast.success("New guest successfully created");
      queryClient.invalidateQueries({queryKey:['guests']});
    }
    ,
    onError: (error) => {
        toast.error(error.message);
      },
  })
  return { isCreating, createGuests };

}

export default useCreateGuest;