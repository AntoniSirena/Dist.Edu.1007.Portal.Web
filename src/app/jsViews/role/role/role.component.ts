import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../../../services/role/role.service';
import { Role } from '../../../models/userRole/user-role';
import { Irole } from '../../../interfaces/Irole/irole';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';
import { CommonService } from '../../../services/common/common.service';
import { PersonType } from '../../../models/personType/person-type';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
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
export class RoleComponent implements OnInit {

  editRoleForm: FormGroup;
  createRoleForm: FormGroup;

  _currentPage: number = 1;

  roles = new Array<Role>();
  role = new Role();

  personTypes = new Array<PersonType>();


  //constructor
  constructor(
    private roleService: RoleService,
    private modalService: NgbModal,
    private commonService: CommonService,
    private form: FormBuilder) {
  }


  ngOnInit(): void {
    this.getRoles();
    this.role.Description = '';
    this.getPersonTyes();
  }

  getRoles() {
    this.roleService.getRoles().subscribe((response: Array<Role>) => {
      this.roles = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getRoleById(id: number) {
    this.roleService.getRoleById(id).subscribe((response: Role) => {
      this.role = response;

      //llenando el modal
      this.editRoleForm = this.form.group({
        id: [`${this.role.Id}`, Validators.required],
        description: [`${this.role.Description}`, Validators.required],
        shortName: [`${this.role.ShortName}`, Validators.required],
        menuTemplate: [`${this.role.MenuTemplate}`],
        parent: [`${this.role.Parent}`, Validators.required],
        enabled: [this.role.Enabled],
        personTypeId: [`${this.role.PersonTypeId}`, Validators.required],
        code: [this.role.Code],
        canCreate: [this.role.CanCreate],
        canRead: [this.role.CanRead],
        canDelete: [this.role.CanDelete],
      });
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getPersonTyes() {
    this.commonService.getPersonTypes().subscribe((response: Array<PersonType>) => {
      this.personTypes = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //open edit modal
  openEditModal(editModal, id: number) {
    this.getRoleById(id);
    this.getRoles();
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }


  //open create modal
  openCreateModal(createModal) {
    this.setValueCreateFrom();
    this.modalService.open(createModal, { size: 'lg' });
  }

  enabledTrue() {
    this.role.Enabled = true;
  }

  enabledFalse() {
    this.role.Enabled = false;
  }

  canCreateTrue(){
    this.role.CanCreate = true;
  }

  canCreateFalse(){
    this.role.CanCreate = false;
  }

  canReadTrue(){
    this.role.CanRead = true;
  }

  canReadFalse(){
    this.role.CanRead = false;
  }

  canDeleteTrue(){
    this.role.CanDelete = true;
  }

  canDeleteFalse(){
    this.role.CanDelete = false;
  }

  //edit
  edit(formValue: any) {

    const role: Irole = {
      Id: this.role.Id,
      Description: formValue.description,
      ShortName: formValue.shortName,
      MenuTemplate: formValue.menuTemplate,
      Parent: formValue.parent,
      Enabled: formValue.enabled,
      Code: this.role.Code,
      PersonTypeId: formValue.personTypeId,
      CanCreate: formValue.canCreate,
      CanRead: formValue.canRead,
      CanDelete: formValue.canDelete,
      CreationTime: this.role.CreationTime,
      CreatorUserId: this.role.CreatorUserId,
      LastModificationTime: this.role.LastModificationTime,
      LastModifierUserId: this.role.LastModifierUserId,
      DeleterUserId: this.role.DeleterUserId,
      DeletionTime: this.role.DeletionTime,
      IsActive: this.role.IsActive,
      IsDeleted: this.role.IsDeleted
    };

    this.roleService.editRole(role).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getRoles();
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

    const role: Irole = {
      Id: 0,
      Description: formValue.description,
      ShortName: formValue.shortName,
      MenuTemplate: formValue.menuTemplate,
      Parent: formValue.parent,
      Enabled: formValue.enabled,
      IsActive: true,
      IsDeleted: false,
      Code: null,
      PersonTypeId: formValue.personTypeId,
      CanCreate: formValue.canCreate,
      CanRead: formValue.canRead,
      CanDelete: formValue.canDelete,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null
    };

    this.roleService.createRole(role).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getRoles();
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


  //edit from set value ''
  setValueEditFrom() {
    this.editRoleForm = this.form.group({
      id: [0, Validators.required],
      description: ['', Validators.required],
      shortName: ['', Validators.required],
      menuTemplate: [''],
      parent: ['', Validators.required],
      enabled: [false],
      personTypeId: [0, Validators.required],
      code:[''],
      canRead: [false],
      canDelete: [false],
      canCreate: [false]
    });
  }

  //create from set value ''
  setValueCreateFrom() {
    this.createRoleForm = this.form.group({
      id: [0, Validators.required],
      description: ['', Validators.required],
      shortName: ['', Validators.required],
      menuTemplate: [''],
      parent: ['', Validators.required],
      enabled: [false],
      personTypeId: [0, Validators.required],
      canRead: [false],
      canDelete: [false],
      canCreate: [false]
    });
  }

}
