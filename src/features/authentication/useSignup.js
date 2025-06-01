import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup(){
  const {mutate: signup , isPending: isSigningup} = useMutation({
    mutationFn: signupApi,
    onSuccess: (data)=>{
      console.log("Signup successful", data);
      toast.success("Account successfully created! please verify the new account from the user's email address");
    }
  })
  return { signup, isSigningup };
}