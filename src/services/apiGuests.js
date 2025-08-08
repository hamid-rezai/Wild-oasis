import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

const getGuests = async ({ sortBy, filter, page }) => {
  let query = supabase.from("guests").select("*", { count: "exact" });

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
    throw new Error("Guests could not get loaded");
  }
  return { data, count };
};
export default getGuests;

export async function deleteGuests(id) {
  const { error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be deleted");
  }
}

export async function createEditGuests(newGuest, Id) {
  // 1. Create/Edit Guest
  let query = supabase.from("guests");
  //A) CREATE
  if (!Id) query = query.insert([newGuest]).select().single();
  //B) EDIT
  if (Id) query = query.update(newGuest).eq("id", Id).select().single();
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }
  return data;
}

export async function getSingleGuest(id) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be found");
  }

  return data;
}
