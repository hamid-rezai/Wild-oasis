import React, { useState } from 'react'
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

//Creating Modal using Compound Component
const AddCabin = ()=>{
  return (

    <div>

  <Modal>
    <Modal.Open opens='cabin-form'>
      <Button >Add new cabin</Button>
    </Modal.Open>
    <Modal.Window name='cabin-form'>
      <CreateCabinForm/>
    </Modal.Window>

{/*we can have multiple windows inside the same modal component  */}
    {/* <Modal.Open opens="table">
      <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
      <CreateCabinForm/>
      </Modal.Window> */}
  </Modal>
      </div>
      )
  
}

// const AddCabin = () => {
//   const [isOpanModal, setIsOpanModal] = useState(false);
//   return (
//     <div>
//       <Button  onClick={()=>setIsOpanModal((show)=> !show)}>
//         Add new cabin
//       </Button>
//       {isOpanModal && <Modal onClose={()=>setIsOpanModal(false)}><CreateCabinForm onClose={()=>setIsOpanModal(false)}/></Modal>}
//     </div>
//   )
// }

export default AddCabin
