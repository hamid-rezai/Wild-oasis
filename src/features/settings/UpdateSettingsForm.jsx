import useSettings from './useSettings';
import useUpdateSettings from './useUpdateSettings';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const{isPending , settings : {minBookingLength , maxBookingLength , maxGuestsPerBooking , breakfastPrice} = {} } = useSettings();
   const {isUpdating , updateSetting} = useUpdateSettings();
  if(isPending) return <Spinner/>

  const handleUpdate=(e , field)=>{
    const {value} = e.target;
    if(!value) return ;
    updateSetting({[field]:value});
  }

  return (

    <Form>

      <FormRow label='Minimum nights/booking'>
        <Input type='number' disabled={isUpdating} id='min-nights' defaultValue={minBookingLength} onBlur={(e)=>handleUpdate(e,'minBookingLength')}/>
    </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isUpdating} defaultValue={maxBookingLength} onBlur={(e)=>handleUpdate(e,'maxBookingLength')}/>
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isUpdating} defaultValue={maxGuestsPerBooking} onBlur={(e)=>handleUpdate(e,'maxGuestsPerBooking')}/>
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isUpdating} defaultValue={breakfastPrice} onBlur={(e)=>handleUpdate(e,'breakfastPrice')}/>
      </FormRow>

    </Form>
  );
}

export default UpdateSettingsForm;
