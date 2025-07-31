import styled from "styled-components";
import { useForm, useWatch } from "react-hook-form";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateGuest from "./useCreateGuest";
import useEditGuest from "./useEditGuest";


countries.registerLocale(enLocale);

function CreateGuestForm({ guestToEdit = {}, onClose }) {
  const {id:editId , ...editValues} = guestToEdit;
  const isEditMode = Boolean(editId);
  const { register, handleSubmit,control, watch, reset, getValues, formState } =
    useForm({defaultValues: isEditMode ? editValues : {} });
  const { errors } = formState;
  const { isCreating, createGuests } = useCreateGuest();

  const {isEditing , editGuest} = useEditGuest();

  const nationality = useWatch({control,name:"nationality"})

  const onSubmit = (data) => {
    const code = countries
      .getAlpha2Code(data.nationality, "en")
      ?.toLocaleLowerCase();
    if (!code) {
      return alert(`Sorry , I don't recognize "${data.nationality}".`);
    }

    const countryFlag = `https://flagcdn.com/${code}.svg`;
    if(isEditMode){
      editGuest({
        newGuestData:{...data,countryFlag} , id:editId
      }, {onSuccess: (data)=>{
        reset();
        onClose?.();
      }})
    }else{
      createGuests(
        { ...data  ,
          countryFlag
        },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
            console.log(data);
          },
        }
      );
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form 
      type={onClose ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label='Full Name'
        error={errors?.fullName?.message}>
        <Input type='text' id='fullName' {...register("fullName", {
          required: "This field is required",
        })}/>
      </FormRow>

      <FormRow
        label='Email'
        error={errors?.email?.message}>
        <Input type='email' id='email' {...register("email", {
          required: "This field is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        })}/>
      </FormRow>

      <FormRow
        label='National ID'
        error={errors?.nationalID?.message}>
        <Input type='text' id='nationalID' {...register("nationalID", {
          required: "This field is required",
          minLength: {
            value: 10,
            message: "National ID must be at least 10 digits",
          },
          pattern: {
            value: /^\d+$/,
            message: "National ID must contain only numbers",
          },
        })}/>
      </FormRow>

      <FormRow
        label='Nationality'
        error={errors?.nationality?.message}>
        <Input type='text' id='nationality' {...register("nationality", {
          required: "This field is required",
          minLength: {
            value: 2,
            message: "Please enter a valid nationality",
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Nationality can only contain letters",
          },
        })}/>
      </FormRow>


      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onClose?.()} variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button>{isEditMode ? "Edit guest" : "Add guest"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
