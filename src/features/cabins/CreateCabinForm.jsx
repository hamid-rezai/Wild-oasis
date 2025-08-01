import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditMode = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditMode ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    // Check if the image is a link or a file
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditMode)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form
      type={onClose ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          disabled={isWorking}
          id='name'
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label='Max capacity'
        disabled={isWorking}
        error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Regular price'
        disabled={isWorking}
        error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Price should be at least 0",
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Discount'
        disabled={isWorking}
        error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          {...register("image", {
            required: isEditMode ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onClose?.()} variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditMode ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
