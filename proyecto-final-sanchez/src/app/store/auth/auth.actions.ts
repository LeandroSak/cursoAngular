import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "src/app/dashboard/users/models";



export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'set auth user': props<{ userData: User | null }>()
  }
})