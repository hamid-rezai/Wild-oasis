import styled from "styled-components";
import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSingleBooking } from "../bookings/useSingleBooking";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/useSettings";


import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const {booking , isPending:isLoading} = useSingleBooking();
  const [confirmPaid , setConfirmPaid] = useState(false);
  const [addBreakfast , setAddBreakfast] = useState(false);

  useEffect(()=>setConfirmPaid(booking?.isPaid ?? false), [booking])

  const {checkin , isCheckingIn} = useCheckin();
  const {isPending:isLoadingSettings ,  settings} = useSettings();

  if (isLoading || isLoadingSettings) return <Spinner />;

  
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  
  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if(!confirmPaid) return;
    
    if(addBreakfast){
      checkin({bookingId, breakfast:{hasBreakfast:true , extrasPrice:optionalBreakfastPrice, totalPrice:totalPrice+optionalBreakfastPrice} })
    }else {

      checkin({bookingId , breakfast:{} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      { !hasBreakfast && <Box>
        <Checkbox checked={addBreakfast} onChange={()=> {setAddBreakfast((add)=>!add); setConfirmPaid(false)}} id="breakfast">
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox onChange={()=> setConfirmPaid((confirm)=> !confirm)} id="confirm" disabled={confirmPaid || isCheckingIn} checked={confirmPaid}>
          I confirm that {guests.fullName} has paid the total amount of {" "} {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice +optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
