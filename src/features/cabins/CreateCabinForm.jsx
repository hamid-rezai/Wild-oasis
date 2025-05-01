import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const {register , handleSubmit, reset , getValues , formState} = useForm();
  const {errors} = formState;

  const {mutate , isPending}=useMutation({
    mutationFn: createCabins,
    onSuccess:()=>{
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({queryKey:['cabins']});
      reset();
    },
    onError:(error)=>{
      toast.error(error.message);
    }
  })

  const onSubmit = (data) => {
    mutate(data);
  }

  const onError = (errors) => {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit , onError)}>

        <FormRow label="Cabin name" error={errors?.name?.message} >
        <Input type="text" disabled={isPending} id="name" {...register("name" , {
          required:"This field is required"
          })}/>
        </FormRow>

        <FormRow label="Max capacity" disabled={isPending} error={errors?.maxCapacity?.message} >
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required:"This field is required",
          min:{
            value:1,
            message:"Capacity should be at least 1"
          }
          })}/>
      </FormRow>

      <FormRow label="Regular price" disabled={isPending} error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice" , {
          required:"This field is required",
          min:{
            value:0,
            message:"Price should be at least 0"
          }})}/>
      </FormRow>

      <FormRow label="Discount" disabled={isPending} error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount" , {
          required:"This field is required",
          validate: (value)=> value <= getValues().regularPrice || "Discount should be less than regular price",
          })}/>
      </FormRow>

      <FormRow label="Description" disabled={isPending} error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register("description" , {
          required:"This field is required"
          })}/>
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
