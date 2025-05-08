import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useCreateCabin=()=>{

  const queryClient = useQueryClient();
    
    const { mutate: createCabin, isPending: isCreating } = useMutation({
      mutationFn: createEditCabins,
      onSuccess: () => {
        toast.success("New cabin successfully created");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
        
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
    return {isCreating , createCabin};
}

export default useCreateCabin;
