import styled from "styled-components";
import { useBookings } from "./useBookings";

import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;
function BookingTable() {
  const { isPending, bookings, count } = useBookings();
  console.log(bookings);

  if (isPending) return <Spinner />;

  if (!bookings.length) return <Empty resourceName='bookings' />;

  return (
    <Menus>
      <TableWrapper>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div data-label="Cabin">Cabin</div>
          <div data-label="Guest">Guest</div>
          <div data-label="Dates">Dates</div>
          <div data-label="Status">Status</div>
          <div data-label="Amount">Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
      </TableWrapper>
    </Menus>
  );
}

export default BookingTable;
