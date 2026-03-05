import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {CartService} from '../services/cart.service';
import {SnackbarService} from '../services/snackbar.service';

export const emptyCartGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);
  const snackbarService = inject(SnackbarService);

  if (cartService.cart() && cartService.itemCount()) {
    return true;
  } else {
    snackbarService.error('Your cart is empty');
    router.navigateByUrl('/cart');
    return false;
  }
};
