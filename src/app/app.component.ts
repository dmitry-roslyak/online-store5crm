import { Component } from '@angular/core';
import { loadLocalStorage } from './store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'online-store5crm';
  store: Store<State>;
  constructor(store: Store<State>) {
    this.store = store;
  }
  ngOnInit() {
    this.store.dispatch(loadLocalStorage())
  }
}
