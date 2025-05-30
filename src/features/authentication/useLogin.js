import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){
  const navigate = useNavigate();
 const {mutate: login, isPending:isLoading } = useMutation({
  mutationFn: ({email , password})=>loginApi({email,password}),
  onSuccess: (data)=> {
    console.log(data);
    toast.success('Login successful!');
    navigate("/dashboard");
  },
  onError:(error)=>{
    console.log("ERROR",error);
    toast.error("Provided email or password are incorrect")

  }
 });
 return {login , isLoading}
}