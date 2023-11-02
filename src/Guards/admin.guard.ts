import { CanActivateFn,Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { inject } from '@angular/core';
export const adminGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token')
  const alertservice = inject(MessageService)

  if (token) {
    const decryptToken = token.split('.')[1];
      const decode = JSON.parse(atob(decryptToken));
      if(token && decode.role_id == 1){
        return true;
      }
  }
  else{
  return false;
}
return false
};
