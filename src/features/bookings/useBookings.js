import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings(){

  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all" ? null : {field:"status" , value:filterValue};

  //Sort

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field , direction] = sortByRaw.split("-");
  const sortBy = {field , direction};

  //Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isPending , data:result , error} = useQuery({
    queryKey:["bookings" , filter, sortBy , page],
    queryFn:()=>getBookings({filter , sortBy , page}),
  });

  const bookings = result?.data ?? [];
  const count = result?.count ?? 0;

  //Prefetching
  const totalPages = Math.ceil(count / PAGE_SIZE);
  if(page < totalPages)
  queryClient.prefetchQuery({
    queryKey:["bookings" , filter, sortBy , page + 1],
    queryFn:()=>getBookings({filter , sortBy , page:page+1}),
  })

  if(page > 1)
    queryClient.prefetchQuery({
      queryKey:["bookings" , filter, sortBy , page - 1],
      queryFn:()=>getBookings({filter , sortBy , page:page-1}),
    })

  return {
    isPending,
    bookings,
    error,
    count,
  };
}