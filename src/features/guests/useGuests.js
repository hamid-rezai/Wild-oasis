import { useQuery, useQueryClient } from "@tanstack/react-query";
import getGuests from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

const useGuests = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get("booking");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : null;

  //Sort

  const sortByRaw = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Pagination
  const page = filterValue === "all" ? Number(searchParams.get("page") || 1): null;

  const {
    isPending,
    data: result,
    error,
  } = useQuery({
    queryKey: ["guests", filterValue, sortBy, page],
    queryFn: () => getGuests({ filter:null, sortBy, page }),
  });

  const guests = result?.data ?? [];
  const count = result?.count ?? 0;

  //Prefetching
  const totalPages = Math.ceil(count / PAGE_SIZE);
  if (page < totalPages)
    queryClient.prefetchQuery({
      queryKey: ["guests", filter, sortBy, page + 1],
      queryFn: () => getGuests({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["guests", filter, sortBy, page - 1],
      queryFn: () => getGuests({ filter, sortBy, page: page - 1 }),
    });

  return {
    isPending,
    guests,
    error,
    count,
  };
};

export default useGuests;
