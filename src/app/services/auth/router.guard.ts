import {CanActivateFn, Router} from '@angular/router';
import {LocalStorageService} from "./local-storage.service";

export const routerGuard: CanActivateFn = (route, state) => {
  const authService = new LocalStorageService(); // Ideally, inject this service
  const router = new Router(); // Ideally, inject this service

  if (authService.isLoggedIn()) {
    return true;
  } else {
    alert("You are not authorized to access this resource")
    router.navigate(['/login']);
    return false;
  }

};
