import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditBookings } from "../../services/apiBookings";

const useEditBooking = ()=>{
  const queryClient = useQueryClient();

  const { mutate: editBooking, isPending: isEditing } = useMutation({
    mutationFn: ({newBookingData , id})=>createEditBookings(newBookingData,id),
    onSuccess: () => {
      toast.success("Booking successfully edited");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {editBooking , isEditing};
}
export default useEditBooking;