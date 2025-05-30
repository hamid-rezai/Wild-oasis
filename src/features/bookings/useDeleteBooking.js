import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const {mutate:deleteBooking, isPending:isDeleting} = useMutation({
    mutationFn: deleteBookings,
    onSuccess: ()=>{
      toast.success(`Booking successfully deleted!`);
      queryClient.invalidateQueries({queryKey:['bookings']})
    },
    onError: (error)=>{
      toast.error(error.message || "There was an error deleting the booking");
    }
  });
  return {deleteBooking, isDeleting};
}

export default useDeleteBooking
