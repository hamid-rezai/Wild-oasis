import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {mutate: logout , isPending: isLogingout} = useMutation({
    mutationFn:logoutApi,
    onSuccess:()=>{
      toast.success("You have been logged out successfully");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError:(error)=>{
      toast.error(error.message);
    }
  })
  return { logout, isLogingout };
}