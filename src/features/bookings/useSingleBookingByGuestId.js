import { useQuery } from "@tanstack/react-query";
import { getBookingsByGuestId } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useSingleBookingByGuestId() {
  const { guestId } = useParams();

  const {
    isPending,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", guestId],
    queryFn: () => getBookingsByGuestId(guestId),
    retry: false,
  });
  return {
    isPending,
    booking,
    error,
  };
}
