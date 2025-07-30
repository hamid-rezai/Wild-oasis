import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getBookings({ sortBy, filter, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id , created_at, startDate , endDate, numNights, numGuests, status, totalPrice,observations,hasBreakfast, cabins(name , id ), guests(fullName,email , id)",
      { count: "exact" }
    );

  //Filter
  if (filter) query = query.eq(filter.field, filter.value);

  //Sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  //Pagination
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  if (page) query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("* , cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingsByGuestId(guestId) {
  const { data, error } = await supabase
    .from("bookings")
    .select(" * , cabins(*)")
    .eq("guestId", guestId)
    .order("startDate", { ascending: true });
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function getAllBookings() {
  let { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function createEditBookings(newBooking, Id) {
  // 1. Create/Edit booking
  let query = supabase.from("bookings");
  //A) CREATE
  if (!Id) query = query.insert([newBooking]).select().single();
  //B) EDIT
  if (Id) query = query.update(newBooking).eq("id", Id).select().single();
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
//date should be ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(startDateISO , endDateISO) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .in("status", ["checked-in", "checked-out"])
    .gte("created_at", startDateISO)
    .lte("created_at", endDateISO)
    .order("created_at", { ascending: true });

  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const until = new Date().toISOString();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .gte("created_at", since)
    .lte("created_at", until)
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  console.log(data);
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBookings(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
