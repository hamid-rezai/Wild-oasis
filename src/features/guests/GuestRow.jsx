import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMemo } from "react";
import useDeleteGuest from "./useDeleteGuest";
import useAllBookings from "../bookings/useAllBookings";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import {
  HiEye,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateGuestForm from "./CreateGuestForm";
import TickOrCross from "../../ui/TickOrCross";

const GuestName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  &::after {
    content: attr(data-tooltip);
    position: absolute;
    background-color: var(--color-grey-50);
    color: var(--color-grey-600);
    padding: 0.4rem 0.8rem;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(-100%);
    transition: opacity 0.2s ease-in-out;
    pointer-events: none;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-0.5rem);
  }
  &:hover::after {
    opacity: 1;
  }
`;

const GuestRow = ({ guest }) => {
  const { id: guestID, fullName, email, nationalID, nationality } = guest;
  const { bookings = [], isLoading } = useAllBookings();
  const navigate = useNavigate();
  const { deleteGuest, isDeleting } = useDeleteGuest();
  const hasBooking = useMemo(() => {
    return (
      !isLoading && bookings.some((booking) => booking.guestId === guestID)
    );
  }, [bookings, guestID, isLoading]);

  return (
    <Table.Row>
      <div>
        <Tooltip data-tooltip={hasBooking ? "Has booking" : "No  booking"}>
          <TickOrCross hasBooking={hasBooking} />
        </Tooltip>
      </div>
      <GuestName data-label="FullName">{fullName}</GuestName>
      <div data-label="Email">{email}</div>
      <div data-label="NationalID">{nationalID}</div>
      <div data-label="Nationality">{nationality}</div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={guestID} />

          <Menus.List id={guestID}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/guests/${guestID}`)}>
              View
            </Menus.Button>

            <Modal.Open opens='editGuest'>
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens='deleteGuest'>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
            </Menus.List>

            <Modal.Window name='editGuest'>
              <CreateGuestForm guestToEdit={guest} />
            </Modal.Window>
            <Modal.Window name='deleteGuest'>
              <ConfirmDelete
                resourceName='guests'
                disabled={isDeleting}
                onConfirm={() => deleteGuest(guestID)}
              />
            </Modal.Window>
          
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
};

export default GuestRow;
