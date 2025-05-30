import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useSingleBooking } from "./useSingleBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useState } from "react";
import { useCheckout } from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking , isPending:isLoading} = useSingleBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const {checkout , isPending:isCheckingOut} = useCheckout();
  const {deleteBooking, isDeleting} = useDeleteBooking();

  if(isLoading) return <Spinner/>
  
  const {status , id:bookingId} = booking;
  
  
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />


      <ButtonGroup>
        <Modal>

        <Modal.Open opens="delete">
          <Button icon={<HiTrash/>} variation="danger" > Delete booking </Button>
        </Modal.Open>

        <Modal.Window name="delete">
          <ConfirmDelete resourceName="booking" disabled={isDeleting} onConfirm={()=>{deleteBooking(bookingId , {
            onSettled:()=>{
              navigate(-1);
            }
          })}}/>
        </Modal.Window>
        </Modal>

        {
            status === "unconfirmed" && (
              <Button icon={<HiArrowDownOnSquare/>} onClick={()=>navigate(`/checkin/${bookingId}`)}>Check in</Button>
            )
          }

          {status === "checked-in" && (
                      <Button
                        icon={<HiArrowUpOnSquare />}
                        onClick={() => checkout(bookingId)}
                        disabled={isCheckingOut }>
                        Check out
                      </Button>
                    )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>

      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
