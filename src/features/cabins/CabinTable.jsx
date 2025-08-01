import { useSearchParams } from "react-router-dom";
import useCabins from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";


const CabinTable = ()=>{
  const {isLoading , cabins}= useCabins();
  const [searchParams] = useSearchParams();

  if(isLoading) return <Spinner/>
  if(!cabins.length) return <Empty resourceName="cabins" />

  //Filter
  const filterValue = searchParams.get("discount") || "all";
  
  let filteredCabins;

  if(filterValue === "all") filteredCabins = cabins;
  if(filterValue === "no-discount") filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if(filterValue === "with-discount") filteredCabins = cabins.filter(cabin => cabin.discount > 0);


  //Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field , direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const SortedCabins = filteredCabins.sort((a,b)=>(a[field] - b[field]) * modifier );

  return (
    <Menus>

    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div data-label="Cabin">Cabin</div>
        <div data-label="Capacity">Capacity</div>
        <div data-label="Price">Price</div>
        <div data-label="Discount">Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={filteredCabins} render={(cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      )}/>
      
    </Table>
      </Menus>
  )
}
export default CabinTable;