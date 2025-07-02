import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function GuestTableOperations() {
  return (
    <TableOperations>

      <Filter filterField="booking" options={[{value:"all" , label:"All"},
      {value:"no-booking" , label:"No booking"},
      {value:"with-booking" , label:"With booking"}
    ]}/>

      <SortBy
        options={[
          { value: "fullName-asc", label: "Name (A→Z)" },
          { value: "fullName-desc", label: "Name (Z→A)" },
          { value: "nationality-asc", label: "Country A→Z" },
          { value: "nationality-desc", label: "Country Z→A" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperations;
