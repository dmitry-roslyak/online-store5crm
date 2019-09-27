import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { countChange } from '../store/actions';

@Component({
  templateUrl: './cart.component.html',
})

export class CartComponent {
  title = 'Cart';
  products: Product[];
  total = [
    { price: 0, weight: 0 }
  ];

  displayedColumns: string[] = ['weight', 'price', 'count', 'description'];
  displayedColumns2: string[] = ['weight', 'price'];
  store: Store<State>;

  constructor(store: Store<State>) {
    this.store = store;
  }
  reSetCount($event, item) {
    item.count = $event.target.value = $event.target.value > 0 ? +$event.target.value : 1;
    this.store.dispatch(countChange({ product: item }));
    this.totalsCompute();
  }
  totalsCompute() {
    this.total = [
      { price: 0, weight: 0 }
    ];
    this.products.forEach(item => {
      this.total[0].price += item.price * item.count;
      this.total[0].weight += item.weight * item.count;
    });
  }
  ngOnInit() {
    this.store.select((state: any) => state.app).subscribe((state: State) => {
      this.products = state.products.filter(value => state.cart.map(cartProduct => cartProduct.id).includes(value.id))
    })
    this.totalsCompute();
  }
}
