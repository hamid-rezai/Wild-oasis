import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditGuests } from "../../services/apiGuests";

const useEditGuest = ()=>{
  const queryClient = useQueryClient();

  const { mutate: editGuest, isPending: isEditing } = useMutation({
    mutationFn: ({newGuestData , id})=>createEditGuests(newGuestData,id),
    onSuccess: () => {
      toast.success("Guest successfully edited");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {editGuest , isEditing};
}
export default useEditGuest;