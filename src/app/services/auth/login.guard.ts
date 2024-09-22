import {CanActivateFn, Router} from '@angular/router';
import {LocalStorageService} from "./local-storage.service";

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = new LocalStorageService(); // Ideally, inject this service
  const router = new Router(); // Ideally, inject this service

  if (authService.isLoggedIn()) {
    alert("You are already logged in!")
    router.navigate(['/admin']);
    return false;
  } else {
    return true;
  }
};
