import { CanActivateFn,Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { inject } from '@angular/core';
export const userGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token')
  const alertservice = inject(MessageService)

  if (token) {
    const decryptToken = token.split('.')[1];
      const decode = JSON.parse(atob(decryptToken));
      if(token && decode.role_id == 2){
        return true;
      }
    
  }
  else{
  alertservice.add({
    key: "tc",
    severity: "error",
    summary: "Login!",
    detail:"Kindly Login to Register Complaints"
  });
  return false;
}
return false
};
