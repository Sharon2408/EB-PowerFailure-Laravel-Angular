import { CanActivateFn } from '@angular/router';

export const linemenGuard: CanActivateFn = (route, state) => {
  return true;
};
