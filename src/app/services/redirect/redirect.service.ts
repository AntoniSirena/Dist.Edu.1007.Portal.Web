import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';
import { Profile } from '../../models/profile/profile';
import { locale } from 'moment';


@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router,
    private loginSevice: LoginService) {

  }

  login() {

    if (localStorage.length > 0) {
      let userName = JSON.parse(localStorage.getItem('userName'));
      localStorage.clear();
      this.loginSevice.logOut(userName).subscribe((response: any) => {
      },
        error => {
          console.log(JSON.stringify(error));
        });

      this.router.navigate(['login']).then(() => {
        Swal.fire({
          icon: 'warning',
          title: 'Estimado usuario su sesión ha expirado',
          showConfirmButton: false,
          timer: 4000
        }).then(() => {
          window.location.reload();
        });
      });
    }

  }

  logout() {

    this.router.navigate(['login']).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada con exito',
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
        window.location.reload();
      });
    });

    let userId = JSON.parse(localStorage.getItem('userId'));
    localStorage.clear();
    this.loginSevice.logOut(userId).subscribe((response: any) => {
    },
      error => {
        console.log(JSON.stringify(error));
      });

  }

  error500() {
    Swal.fire({
      icon: 'warning',
      title: 'Estimado usuario ha ocurrido un error interno',
      showConfirmButton: false,
      timer: 4000
    }).then(() => {
      window.location.reload();
    });
  }

  error404() {
    Swal.fire({
      icon: 'warning',
      title: 'Estimado usuario los registros no fuerón encontrados',
      showConfirmButton: false,
      timer: 4000
    }).then(() => {

    });
  }

  NoAuthorizedRequest() {

    if (localStorage.length > 0) {
      let userName = JSON.parse(localStorage.getItem('userName'));
      localStorage.clear();
      this.loginSevice.logOut(userName).subscribe((response: any) => {
      },
        error => {
          console.log(JSON.stringify(error));
        });

      Swal.fire({
        icon: 'warning',
        title: 'Estimado usuario la solicitud no fué autorizada',
        showConfirmButton: false,
        timer: 4000
      }).then(() => {
        this.router.navigate(['login']);
        window.location.reload();
      });
    }
  }

  welcomeToSystem() {
    this.router.navigate(['portada']).then(() => {
      window.location.reload();
    });
  }

  register() {
    this.router.navigate(['register']);
  }

}
