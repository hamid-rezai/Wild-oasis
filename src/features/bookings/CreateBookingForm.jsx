import styled from "styled-components";
import { get, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateBooking from "./useCreateBooking";
import useEditBooking from "./useEditBooking";
import useCabins from "../cabins/useCabins";
import useGuests from "../guests/useGuests";
import { subtractDates } from "../../utils/helpers";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import useSettings from "../settings/useSettings";
import Spinner from "../../ui/Spinner";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function CreateBookingForm({ bookingtoEdit = {}, onClose }) {
  const { id: editId } = bookingtoEdit;
  const isEditMode = Boolean(editId);
  console.log(bookingtoEdit);
  const initialValues = isEditMode
    ? {
        cabinId: bookingtoEdit.cabins.id,
        guestId: bookingtoEdit.guests.id,
        startDate: bookingtoEdit.startDate,
        endDate: bookingtoEdit.endDate,
        numNights: bookingtoEdit.numNights,
        numGuests: bookingtoEdit.numGuests,
        status: bookingtoEdit.status || "unconfirmed",
        hasBreakfast: bookingtoEdit.hasBreakfast ?? false,
        isPaid: bookingtoEdit.isPaid ?? false,
        observations: bookingtoEdit.observations || "",
      }
    : {
        status: bookingtoEdit.status ?? "unconfirmed",
        isPaid: bookingtoEdit.isPaid ?? false,
        hasBreakfast: bookingtoEdit.hasBreakfast ?? false,
      };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState,
  } = useForm({ defaultValues: initialValues });
  const { errors } = formState;
  const { isCreating, createBookings } = useCreateBooking();
  const { isEditing, editBooking } = useEditBooking();
  const { cabins } = useCabins();
  const { isLoading, guests } = useGuests();
  const { isPending: isLoadingSettings, settings } = useSettings();

  const [startDate, endDate, cabinId, numGuests, numNights, hasBreakfastValue] =
    watch([
      "startDate",
      "endDate",
      "cabinId",
      "numGuests",
      "numNights",
      "hasBreakfast",
    ]);
  const statusOptions = ["unconfirmed", "checked-in", "checked-out"];
  useEffect(() => {
    if (!startDate || !endDate) return;
    const nights = subtractDates(endDate, startDate);
    setValue("numNights", nights, { shouldValidate: true });
  }, [startDate, endDate, setValue]);

  const cabin = cabins?.find((c) => String(c.id) === String(cabinId));
  const guestCount = Number(numGuests);
  const reg = Number(cabin?.regularPrice);
  const discount = Number(cabin?.discount);
  const rate = reg - discount;
  const cabinPrice = rate * guestCount * numNights;
  useEffect(() => {
    if (!numNights || !numGuests || !cabinId) return;
    if (isNaN(guestCount)) return;
    if (!cabin) return;

    setValue("cabinPrice", cabinPrice, { shouldValidate: true });
  }, [numNights, cabinId, cabins, numGuests, setValue]);
  const nowLocal = new Date();
  const minDateTime = nowLocal.toISOString().slice(0, 16);
  const today = new Date().toISOString().split("T")[0];

  const isWorking = isCreating || isEditing || isLoading;

  const baseCabinPrice = getValues("cabinPrice");
  const breakfastCost = hasBreakfastValue
    ? settings?.breakfastPrice * numNights * numGuests
    : 0;
  const totalPrice = baseCabinPrice + breakfastCost;

  const onSubmit = (data) => {
    const paid = data.status === "unconfirmed" ? false : true;
    if (isEditMode)
      editBooking(
        {
          newBookingData: {
            ...data,
            totalPrice: totalPrice,
            extrasPrice: breakfastCost,
            isPaid: paid,
          },
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
    else
      createBookings(
        {
          ...data,
          totalPrice: totalPrice,
          extrasPrice: breakfastCost,
          isPaid: paid,
        },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
    console.log(data);
  };

  const onError = (errors) => {
    console.log(errors);
  };

  if (isLoadingSettings) return <Spinner />;
  return (
    <Form
      type={onClose ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin' error={errors?.cabinId?.message}>
        <StyledSelect
          disabled={isWorking}
          id='cabinId'
          {...register("cabinId", {
            registered: true,
            valueAsNumber: true,
            required: "This field is required",
          })}>
          {cabins?.map((option) => (
            <option key={option.name} value={option.id}>
              {option.name}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label='Guest' error={errors?.guestId?.message}>
        <StyledSelect
          disabled={isWorking}
          id='guestId'
          {...register("guestId", {
            registered: true,
            valueAsNumber: true,
            required: "This field is required",
          })}>
          {guests?.map((option) => (
            <option key={option.fullName} value={option.id}>
              {option.fullName}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow
        label='Start date'
        disabled={isWorking}
        error={errors?.startDate?.message}>
        <Input
          type='dateTime-local'
          id='startDate'
          min={minDateTime}
          {...register("startDate", {
            required: "This field is required",
            validate: (value) => {
              value >= minDateTime ||
                "Start date should be today or in the future";
            },
          })}
        />
      </FormRow>

      <FormRow
        label='End date'
        disabled={isWorking}
        error={errors?.endDate?.message}>
        <Input
          type='dateTime-local'
          id='endDate'
          defaultValue={0}
          min={minDateTime}
          {...register("endDate", {
            required: "This field is required",
            validate: (value) =>
              value >= minDateTime ||
              "End date should be today or in the future",
          })}
        />
      </FormRow>

      <FormRow label='Status' error={errors?.status?.message}>
        <StyledSelect
          disabled={isWorking}
          id='status'
          {...register("status", {
            registered: true,
            required: "This field is required",
          })}>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label='Observations' error={errors?.observations?.message}>
        <Textarea
          type='text'
          id='observations'
          {...register("observations", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label='Number of nights'
        disabled={isWorking}
        error={errors?.numNights?.message}>
        <Input
          type='number'
          id='numNights'
          readOnly
          {...register("numNights", {
            valueAsNumber: true,
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label='Number of Guests'
        disabled={isWorking}
        error={errors?.numGuests?.message}>
        <Input
          type='number'
          id='numGuests'
          {...register("numGuests", {
            valueAsNumber: true,
            required: "This field is required",
            validate: (value) => {
              const selectedCabin = cabins.find(
                (c) => c.id === getValues("cabinId")
              );
              if (!selectedCabin) return true;
              return (
                value <= selectedCabin.maxCapacity ||
                `Max capacity for this cabin is ${selectedCabin.maxCapacity}`
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Total price'
        disabled={isWorking}
        error={errors?.cabinPrice?.message}>
        <Input
          type='number'
          id='cabinPrice'
          value={hasBreakfastValue ? totalPrice : cabinPrice}
          readOnly
          {...register("cabinPrice")}
        />
      </FormRow>

      <FormRow>
        <Checkbox
          id='hasBreakfast'
          disabled={isWorking}
          {...register("hasBreakfast")}>
          Include breakfast
        </Checkbox>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onClose?.()} variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditMode ? "Edit booking" : "Add new booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
