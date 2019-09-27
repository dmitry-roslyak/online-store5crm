import { createReducer, on } from '@ngrx/store';
import { addOrRemove, countChange, loadLocalStorage } from './actions';

const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla aliquam metus, vitae pretium arcu feugiat sed. Praesent facilisis erat eu mi pretium, sit amet convallis ex consectetur. Cras efficitur turpis non egestas vestibulum. Vestibulum metus.";

export const initialState: State = {
  products: [
    { id: 1, weight: 20, price: 205, count: 1, description: desc },
    { id: 2, weight: 12, price: 55, count: 1, description: desc },
    { id: 3, weight: 24, price: 251, count: 1, description: desc },
    { id: 4, weight: 75, price: 1000, count: 1, description: desc },
    { id: 5, weight: 32, price: 360, count: 1, description: desc },
    { id: 6, weight: 25, price: 120, count: 1, description: desc },
  ],
  cart: []
};

const _productReducer = createReducer(initialState,
  on(loadLocalStorage, (state) => {
    let localStorage = window.localStorage.getItem("cart");
    return (localStorage ? { ...initialState, cart: JSON.parse(localStorage) } : initialState);
  }),
  on(addOrRemove, (state, { product }) => {
    let index = state.cart.findIndex(item => item.id === product.id);
    index > -1 ? state.cart.splice(index, 1) : state.cart.push(product);
    window.localStorage.setItem("cart", JSON.stringify(state.cart))
    return { ...state };
  }),
  on(countChange, (state, { product }) => {
    let index = state.cart.findIndex(item => item.id === product.id);
    state.cart[index].count = product.count
    window.localStorage.setItem("cart", JSON.stringify(state.cart))
    return { ...state };
  }),
);

export function cartReducer(state, action) {
  return _productReducer(state, action);
}