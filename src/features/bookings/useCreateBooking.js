import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useCreateBooking = () => {

  const queryClient = useQueryClient();
  const {mutate:createBookings , isPending:isCreating} = useMutation({
    mutationFn: createEditBookings,
    onSuccess:()=>{
      toast.success("New booking successfully created");
      queryClient.invalidateQueries({queryKey:['bookings']});
    }
    ,
    onError: (error) => {
        toast.error(error.message);
      },
  })
  return { isCreating, createBookings };

}

export default useCreateBooking;