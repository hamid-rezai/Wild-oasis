import { useCheckout } from "./useCheckout";

import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const {checkout , isCheckingOut} = useCheckout();
  return (
    <Button variation="primary" size="small" onClick={()=>checkout(bookingId)} disabled={isCheckingOut}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
