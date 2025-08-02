import { useParams } from "react-router-dom";
import styled from "styled-components";
import {useSingleGuest} from "./useSingleGuest";
import { useSingleBookingByGuestId } from "../bookings/useSingleBookingByGuestId";
import { useMoveBack } from "../../hooks/useMoveBack";

import Spinner from "../../ui/Spinner";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";


const Heading = styled.h1`
font-size: 2.4rem;
margin-bottom: 1.6rem;
color: var(--color-grey-800);
`;

const Header = styled.h2`
  margin-bottom:1.6rem;
`

const Section = styled.section`
margin-bottom: 2.4rem;
line-height:2.5rem;`

function GuestDetail(){
  const {guestId} = useParams();
  console.log(guestId);

  const { guest , isPending:guestLoading} = useSingleGuest(guestId);
  const {booking , isPending:bookingLoading} = useSingleBookingByGuestId(guestId);
  const moveBack = useMoveBack();
console.log(guest , booking);
  if(guestLoading || bookingLoading){
    return <Spinner/>
  }

  return (
    <>
    <ButtonText onClick={moveBack} style={{textAlign:"start"}}>
          &larr; Back to guests
    </ButtonText>
    <Heading>{guest.fullName}</Heading>

    <Section>
      <Header>Personal Info</Header>
      <p><strong>Email : </strong><span style={{color:"var(--color-grey-500)"}}>{guest.email}</span></p>
      <p><strong>National ID : </strong><span style={{color:"var(--color-grey-500)"}}>{guest.nationalID}</span></p>
      <p><strong>Number of guests : </strong><span style={{color:"var(--color-grey-500)"}}>{booking[0]?.numNights || 0}</span></p>
      <div style={{display:"flex",gap:"1rem"}}><p><strong>Nationality : </strong><span style={{color:"var(--color-grey-500)"}}>{guest.nationality}</span></p><Flag src={guest.countryFlag} alt={`Flag of ${guest.nationality}`}/></div>
    </Section>

    <Section>
      <Header>Bookings</Header>
      {booking ? (
         <Table columns="1fr 1fr 1fr 1fr 1fr 1fr">
            <Table.Header>
              <div>Booking</div>
              <div>Cabin</div>
              <div>Start Date</div>
              <div>End Date</div>
              <div>Status</div>
              <div>Total</div>
            </Table.Header>
            <Table.Body
              data={booking}
              render={(b) => (
                <Table.Row key={b.id}>
                  <div>{b.id}</div>
                  <div>{b.cabins.name}</div>
                  <div>{new Date(b.startDate).toLocaleDateString()}</div>
                  <div>{new Date(b.endDate).toLocaleDateString()}</div>
                  <div>
                    <Tag type={
                      b.status === "unconfirmed" ? "blue" :
                      b.status === "checked-in" ? "green" : "silver"
                    }>
                      {b.status.replace("-", " ")}
                    </Tag>
                  </div>
                  <div>${b.totalPrice}</div>
                </Table.Row>
              )}
            />
          </Table>
      ) : <Empty resourceName="booking for this guest"/>}
    </Section>


    </>
  )
}

export default GuestDetail;