import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ilogin } from '../../../interfaces/Ilogin/ilogin';
import { RedirectService } from '../../../services/redirect/redirect.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css'],
  providers: [NgbCarouselConfig]
})
export class PortadaComponent implements OnInit {


  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [
    'assets/img/portada/PadrePatría.jpg',
    'assets/img/portada/Dist1007.jpg',
    'assets/img/portada/Dist1007_1.jpg',
  ];

  isLogin: Boolean = false;

  constructor(config: NgbCarouselConfig, private redirectService: RedirectService, private router: Router,) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
  }
  

  alert(){
    alert(true);
  }

  loginUserVisit() {
    const login: Ilogin = {
      UserName: 'admin',
      Password: 'admin123',
      EmailAddress: null
    };

    this.redirectService.SubmitLogin(login, true);
    this.router.navigate(['portada']).then(() => {
      window.location.reload();
    });
  }

}
