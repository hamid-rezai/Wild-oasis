import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import useCabins from "../cabins/useCabins";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-template-rows: auto;
  gap: 2.4rem;

  @media (max-width: 480px) {
    
  }
  @media (max-width: 768px) {
     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.6rem;
  }
  

  
`;

const DashboardLayout = () => {
  const { bookings, isLoading } = useRecentBookings();
  const {
    isLoading: isStaysLoading,
    confirmedStays,
    numDays,
  } = useRecentStays();

  const { cabins, isLoading: isCabinsLoading } = useCabins();

  if (isLoading || isStaysLoading || isCabinsLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart  confirmedStays={confirmedStays} />
      <SalesChart  bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
