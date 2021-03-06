import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iuser, IuserStatuses } from '../../../interfaces/Iuser/iuser';
import Swal from 'sweetalert2';
import { UserDetails, Role } from '../../../models/user/user';
import { Person, Locators } from '../../../models/profile/profile';
import { IpDiviceService } from '../../../services/ipDivice/ip-divice.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
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
export class UserComponent implements OnInit {

  //Variables
  users: any;
  user: Iuser = {
    Id: 0,
    UserName: '',
    Password: '',
    Name: '',
    SurName: '',
    EmailAddress: '',
    StatusId: 0,
    PersonId: 0,
    Image: '',
    Code: '',
    LastLoginTime: '',
    LastLoginTimeEnd: '',
    IsOnline: false,
    DiviceIP: '',
    CreationTime: '',
    CreatorUserId: '',
    LastModificationTime: '',
    LastModifierUserId: 0,
    DeletionTime: '',
    DeleterUserId: 0,
    IsActive: false,
    IsDeleted: false
  };
  userStatuses: IuserStatuses[] = [
    {
      Id: 0,
      Description: '',
      ShortName: '',
      Colour: ''
    }
  ];
  userDetails = new UserDetails();
  person = new Person();
  locators = new Array<Locators>();
  role =  new Role();

  editUserForm: FormGroup;
  createUserForm: FormGroup;

  _currentPage: number = 1;
  currentPageLocators: number = 1;

  totalUsers: number = 0;
  totalLocators: number = 0;

  ipAddress: object;

  @ViewChild('details') detailsModal: ElementRef;


  //constructor
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private form: FormBuilder,
    private ipDiviceService: IpDiviceService) {
  }


  //Init
  ngOnInit() {
    this.getUsers();
    this.getUserStatuses();
    this.setValueCreateFrom();
    this.setValueEditFrom();
    this.getIPAddress();
  }



  //get IP address
  getIPAddress() {
    this.ipDiviceService.getIPAddress();
  }

  //getUsers
  getUsers() {
    this.userService.getUsers().subscribe((response: Iresponse) => {
      this.users = response;
      this.totalUsers = this.users.length;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //getUserById
  getUserById(id: number) {
    this.userService.getUserById(id).subscribe((response: any) => {
      this.user = response;

      //llenando el modal
      this.editUserForm = this.form.group({
        statusId: [`${this.user.StatusId}`, Validators.required]
      });
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //getUserDetails
  getUserDetails(userId: number) {
    this.userService.getUserDetails(userId).subscribe((response: UserDetails) => {
      this.userDetails = response;
      this.role = this.userDetails.Role;
      this.person = this.userDetails.Person;
      this.locators = this.userDetails.Person.Locators;
      this.totalLocators = this.locators.length;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getUserStatuses() {
    this.userService.getUserStatuses().subscribe((response: IuserStatuses[]) => {
      this.userStatuses = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //open details modal
  openDetailModal(userId: number) {
    this.getUserDetails(userId);
    this.modalService.open(this.detailsModal, { size: 'lg', scrollable: true });
  }

  //open edit modal
  openEditModal(editModal, id: number) {
    this.getUserById(id);
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg', scrollable: true });
  }

  //open create modal
  openCreateModal(createModal) {
    this.setValueCreateFrom();
    this.modalService.open(createModal, { size: 'lg', scrollable: true });
  }

  //edit
  edit(formValue: any) {
    const user: Iuser = {
      Id: this.user.Id,
      UserName: this.user.UserName,
      Password: this.user.Password,
      Name: this.user.Name,
      SurName: this.user.SurName,
      EmailAddress: this.user.EmailAddress,
      StatusId: formValue.statusId,
      PersonId: this.user.PersonId,
      Image: this.user.Image,
      Code: this.user.Code,
      LastLoginTime: this.user.LastLoginTime,
      LastLoginTimeEnd: this.user.LastLoginTimeEnd,
      IsOnline: this.user.IsOnline,
      DiviceIP: this.user.DiviceIP,
      CreationTime: this.user.CreationTime,
      CreatorUserId: this.user.CreatorUserId,
      LastModificationTime: this.user.LastModificationTime,
      LastModifierUserId: this.user.LastModifierUserId,
      DeleterUserId: this.user.DeleterUserId,
      DeletionTime: this.user.DeletionTime,
      IsActive: this.user.IsActive,
      IsDeleted: this.user.IsDeleted
    };

    this.userService.editUser(user).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getUsers();
          this.modalService.dismissAll();
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 3000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });

  }

  //create
  create(formValue: any) {

    const user: Iuser = {
      Id: 0,
      UserName: formValue.userName,
      EmailAddress: formValue.emailAddress,
      Password: formValue.password,
      Name: formValue.name,
      SurName: formValue.surName,
      StatusId: formValue.statusId,
      PersonId: null,
      Image: null,
      Code: null,
      LastLoginTime: null,
      LastLoginTimeEnd: null,
      IsOnline: false,
      DiviceIP: null,
      IsActive: true,
      IsDeleted: false,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null
    };

    this.userService.createUser(user).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getUsers();
          this.modalService.dismissAll();
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 3000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });

  }

  //create from set value ''
  setValueCreateFrom() {
    this.createUserForm = this.form.group({
      userName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surName: ['', Validators.required],
      statusId: [this.userStatuses[0].Id, Validators.required]
    });
  }

  //edit from set value ''
  setValueEditFrom() {
    this.editUserForm = this.form.group({
      statusId: ['', Validators.required],
    });
  }

}
