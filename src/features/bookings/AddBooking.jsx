import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

//Creating Modal using Compound Component
const AddBooking = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens='booking-form'>
          <Button>Add new booking</Button>
        </Modal.Open>
        <Modal.Window name='booking-form'>
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddBooking;
