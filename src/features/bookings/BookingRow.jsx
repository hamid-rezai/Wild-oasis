import styled from "styled-components";
import { format, isToday } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";

import Menus from "../../ui/Menus";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import CreateBookingForm from "./CreateBookingForm";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking
}) {
  
  const {id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,} = booking;
    const guestName = booking.guests?.fullName ?? "_";
    const guestEmail = booking.guests?.email ?? "_";
    const cabinName = booking.cabins?.name ?? "_";
    const navigate = useNavigate();
    const {checkout , isCheckingOut} = useCheckout();
    const {deleteBooking, isDeleting} = useDeleteBooking();
    const rawStatus = booking.status ?? "unconfirmed";
    const statusToTagName = {
      unconfirmed: "blue",
      "checked-in": "green",
      "checked-out": "silver",
    };
    const tagType = statusToTagName[rawStatus] ?? "blue";
    const prettyStatus = rawStatus.replace("-","");

  return (
    <Table.Row>
      <Cabin data-label="Cabin">{cabinName}</Cabin>

      <Stacked data-label="Guest">
        <span>{guestName}</span>
        <span>{guestEmail}</span>
      </Stacked>

      <Stacked data-label="Dates">
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

<div data-label="Status">
      <Tag type={tagType} >{prettyStatus}</Tag>
</div>

      <Amount data-label="Amount">{formatCurrency(totalPrice)}</Amount>
      <Modal>
      <Menus.Menu>
        <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}>
            See details
          </Menus.Button>
          {status === "unconfirmed" && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Menus.Button>
          )}

          {status === "checked-in" && (
            <Menus.Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(bookingId)}
              disabled={isCheckingOut}>
              Check out
            </Menus.Button>
          )}

          <Modal.Open opens="edit-booking">
            <Menus.Button icon={<HiPencil/>}>
              Edit
            </Menus.Button>
          </Modal.Open>

          <Modal.Open opens="delete">
            <Menus.Button icon={<HiTrash />}>
              Delete Booking
            </Menus.Button>
          </Modal.Open>

        </Menus.List> 
      </Menus.Menu>

        <Modal.Window name="edit-booking">
          <CreateBookingForm bookingtoEdit={booking}/>
        </Modal.Window>
        <Modal.Window name="delete">
          <ConfirmDelete resourceName="booking" disabled={isDeleting} onConfirm={()=>deleteBooking(bookingId)}/>
        </Modal.Window>

      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
