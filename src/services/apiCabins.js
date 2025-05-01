import supabase from "./supabase"

 const getCabins = async () => {
  const { data , error } = await supabase
  .from('cabins')
  .select('*')

  if(error) {
    console.error('Error fetching cabins:', error)
    return null
  }
  return data;
}

export default getCabins;

export async function createCabins(newCabin){
  const { data, error } = await supabase
  .from('cabins')
  .insert([
    newCabin
  ])
  .select()
  if(error){
    console.error(error);
    throw new Error('Cabin could not be created');
  }
  return data;
}

export async function deleteCabins(id){
  const { error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id);

  if(error){
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
  
}
