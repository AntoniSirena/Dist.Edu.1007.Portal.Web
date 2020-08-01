import { Component, OnInit } from '@angular/core';
import { RedirectService } from '../../../services/redirect/redirect.service';
import { Router } from '@angular/router';
import { Ilogin } from '../../../interfaces/Ilogin/ilogin';

@Component({
  selector: 'app-pre-portada',
  templateUrl: './pre-portada.component.html',
  styleUrls: ['./pre-portada.component.css']
})
export class PrePortadaComponent implements OnInit {

  constructor(private redirectService: RedirectService,
    private router: Router) {

  }

  ngOnInit(): void {
    
  }


  loginUserVisit() {
    const login: Ilogin = {
      UserName: 'admin',
      Password: 'admin123',
      EmailAddress: null
    };

    this.redirectService.SubmitLogin(login, true);
    this.router.navigate(['/portada']).then( () => {
      window.location.reload();
    });
    window.location.reload();
  }

}
