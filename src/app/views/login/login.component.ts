import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { RedirectService } from '../../services/redirect/redirect.service'
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ilogin } from '../../interfaces/Ilogin/ilogin';
import { Iresponse } from '../../interfaces/Iresponse/iresponse';
import { Profile } from '../../models/profile/profile';
import { SystemConfiguration } from '../../Templates/systemConfiguration/system-configuration';
import { ExternalService } from '../../services/external/external.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class LoginComponent implements OnInit {

  //constructor
  constructor(
    private loginService: LoginService,
    private redirectService: RedirectService,
    private externalService: ExternalService,
    private modalService: NgbModal,
    private form: FormBuilder
  ) { }

  loginForm: FormGroup;
  resetPasswordForm: FormGroup;

  profile = new Profile();
  systemConfiguration = new SystemConfiguration();

  valueRegisterButton: string;

  canViewLoginForm = localStorage.getItem('canViewLoginForm') || false;

  @ViewChild('resetPasswordModal') resetPasswordModal: ElementRef;



  //Init
  ngOnInit() {
    this.loginForm = this.form.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    if(!this.canViewLoginForm){
      this.redirectPortada();
    }

    this.getValueRegisterButton();
  };


  redirectPortada(){
    const login: Ilogin = {
      UserName: 'visitador',
      Password: 'visitador123',
      EmailAddress: null
    };

    this.redirectService.SubmitLogin(login, true, true);
    localStorage.setItem("canViewLoginForm", JSON.stringify(true));
  }


  //Login
  onSubmit(loginForm: any) {

    const login: Ilogin = {
      UserName: loginForm.userName,
      Password: loginForm.password,
      EmailAddress: null
    };

    this.redirectService.SubmitLogin(login);
  }
  //end

  register() {
    this.redirectService.register();
  }


  getValueRegisterButton() {
    this.externalService.getValueRegisterButton().subscribe((response: any) => {
      this.valueRegisterButton = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //open reset password modal
  openResetPasswordModal() {
    this.setValueResetPasswordForm();
    this.modalService.open(this.resetPasswordModal, { size: 'sm-lg' });
  }


  resetPassword(resetPasswordForm: any){
    const login: Ilogin = {
      UserName: resetPasswordForm.userName,
      Password: resetPasswordForm.password,
      EmailAddress: resetPasswordForm.emailAddress,
    };

    this.loginService.resetPassword(login).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        }).then(() => {
          this.modalService.dismissAll();
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });

  }

  setValueResetPasswordForm(){
    this.resetPasswordForm = this.form.group({
      userName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
    });
  }

  
}
