import { createAction, props } from "@ngrx/store";

export const loadLocalStorage = createAction('[Cart Component] loadLocalStorage');
export const countChange = createAction('[Cart Component] countChange', props<{ product: Product }>());
export const addOrRemove = createAction('[Cart Component] add or remove product', props<{ product: Product }>());