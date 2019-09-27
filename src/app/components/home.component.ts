import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addOrRemove } from '../store/actions';

@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent {
  title = 'online-store5crm';
  products: Product[];
  cart: Product[];
  store: Store<State>;

  constructor(store: Store<State>) {
    this.store = store;
  }
  ngOnInit() {
    this.store.select((state: any) => state.app).subscribe((state: State) => {
      this.products = state.products.filter(value => {
        value.isInCart = state.cart.map(cartProduct => cartProduct.id).includes(value.id)
        return value;
      })
    })
  }

  addToCart(product: Product) {
    this.store.dispatch(addOrRemove({ product: product }));
    this.store.select((state: any) => state.app).subscribe((state: State) => {
      this.products = state.products.filter(value => {
        value.isInCart = state.cart.map(cartProduct => cartProduct.id).includes(value.id)
        return value;
      })
    })
  }
}
