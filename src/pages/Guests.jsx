import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddGuest from "../features/guests/AddGuest";
import GuestTable from "../features/guests/GuestTable";
import GuestTableOperations from "../features/guests/GuestTableOperations";

function Guests() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1" style={{marginRight:"20px"}}>All Guests</Heading>
      <GuestTableOperations/>
    </Row>
    <GuestTable/>
    <AddGuest/>
    </>
  );
}

export default Guests;