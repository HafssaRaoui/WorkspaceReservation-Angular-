import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Intercepteur appelé pour l\'URL :', req.url);

  if (!req.url.includes("/auth/login")) {
    const myToken = localStorage.getItem("angular17token");
    if (myToken) {
      console.log('Token trouvé :', myToken);
      const cloneRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${myToken}`
        }
      });
      return next(cloneRequest);
    } else {
      console.log('Aucun token trouvé');
    }
  }
  
  return next(req);
};
