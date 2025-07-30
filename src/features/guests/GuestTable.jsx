import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import useGuests from "./useGuests";
import GuestRow from "./GuestRow";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import useAllBookings from "../bookings/useAllBookings";
import { PAGE_SIZE } from "../../utils/constants";


const GuestTable = ()=>{
  const {isPending:isLoading , guests , count} = useGuests();
  const [searchParams] = useSearchParams();
  const { bookings = [], isLoadingBooking } = useAllBookings();

  if(isLoading || isLoadingBooking) return <Spinner/>
  if(!guests.length) return <Empty resourceName="guests" />

  //Filter
  const filterValue = searchParams.get("booking") || "all";
  let filteredGuests = guests;

  if(filterValue === "no-booking"){
    filteredGuests=guests.filter((guest)=>!bookings.some((booking)=>booking.guestId === guest.id))
  }
  if(filterValue === "with-booking"){
    filteredGuests=guests.filter((g)=>bookings.some((b)=>b.guestId === g.id))
  }


  //Sort
  const sortBy = searchParams.get("sortBy") || "fullName-asc";
  const [field , direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedGuests = [...filteredGuests].sort((a,b)=>{ const aVal = a[field]; const bVal = b[field] 
  //string comparison for names
  if(typeof aVal === "string"){
    return aVal.localeCompare(bVal)*modifier;
  }
   // numeric comparison otherwise
    return (aVal - bVal) * modifier;
  });

  // Client-side paginate
  const page = Number(searchParams.get("page") || 1);
  let pageData,pageCount;

 
    const start = (page - 1)*PAGE_SIZE;
    pageData = sortedGuests.slice(start,start+PAGE_SIZE);
    pageCount = count;
  

  return (
    <Menus>

    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div data-label="FullName">FullName</div>
        <div data-label="Email">Email</div>
        <div data-label="NationalID">NationalID</div>
        <div data-label="Nationality">Nationality</div>
        {/* <div>Country Flag</div> */}
        <div></div>
      </Table.Header>
      <Table.Body data={pageData} render={(guest) => (
        <GuestRow key={guest.id} guest={guest} />
      )}/>
      <Table.Footer>
        <Pagination count={pageCount} />
      </Table.Footer>
    </Table>
      </Menus>
  )
}
export default GuestTable;