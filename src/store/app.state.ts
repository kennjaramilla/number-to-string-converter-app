import { State } from '@ngxs/store';

@State<string>({
  name: 'app',
  defaults: 'Hello, NGXS!',
})
export class AppState {}
