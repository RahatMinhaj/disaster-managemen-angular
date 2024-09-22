import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {LocalStorageService} from "../local-storage.service";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const sessionStorageService = inject(LocalStorageService);  // Inject AuthService
  const token = sessionStorageService.getToken();
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
