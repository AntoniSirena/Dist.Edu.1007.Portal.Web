import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Docent } from '../../../../models/domain/docent/docent';
import { DocumentType } from '../../../../models/common/documentType/document-type';
import { Area } from '../../../../models/common/area/area';
import { DocentService } from '../../../../services/domain/docent/docent.service';
import { CommonService } from '../../../../services/common/common.service';
import { Idocent } from '../../../../interfaces/domain/Idocent/idocent';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';


@Component({
  selector: 'app-docent',
  templateUrl: './docent.component.html',
  styleUrls: ['./docent.component.css'],
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
export class DocentComponent implements OnInit {

  createDocentForm: FormGroup;
  editDocentForm: FormGroup;

  _currentPage: number = 1;

  docents = new Array<Docent>();
  docent = new Docent();

  documenTypes = new Array<DocumentType>();
  areas = new Array<Area>();

  //constructor
  constructor(
    private docentService: DocentService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }


  ngOnInit(): void {
    this.getDocents();
    this.getDocumenTypes();
    this.getAreas();
  }


  getDocents() {
    this.docentService.getDocents().subscribe((response: Array<Docent>) => {
      this.docents = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getDocumenTypes() {
    this.commonService.getDocumentTypes().subscribe((response: Array<DocumentType>) => {
      this.documenTypes = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getAreas() {
    this.commonService.getAreas().subscribe((response: Array<Area>) => {
      this.areas = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getDocentById(id: number) {
    this.docentService.getDocentBytId(id).subscribe((response: Docent) => {
      this.docent = response;

      //llenando el modal
      this.editDocentForm = this.form.group({
        id: [`${this.docent.Id}`, Validators.required],
        firstName: [`${this.docent.FirstName}`, Validators.required],
        secondName: [`${this.docent.SecondName}`],
        surname: [`${this.docent.Surname}`, Validators.required],
        secondSurname: [`${this.docent.SecondSurname}`],
        fullName: [`${this.docent.FullName}`],
        birthDate: [`${this.docent.BirthDate}`, Validators.required],
        documentTypeID: [`${this.docent.DocumentTypeID}`, Validators.required],
        documentNumber: [`${this.docent.DocumentNumber}`, Validators.required],
        phone: [`${this.docent.Phone}`],
        address: [`${this.docent.Address}`, Validators.required],
        areaId: [`${this.docent.AreaId}`, Validators.required]
      });
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //open create modal
  openCreateModal(createModal) {
    this.setValueCreateFrom();
    this.modalService.open(createModal, { size: 'lg' });
  }

  //open edit modal
  openEditModal(editModal, id: number) {
    this.getDocentById(id);
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }


  //create
  create(formValue: any) {
    const docent: Idocent = {
      Id: 0,
      FirstName: formValue.firstName,
      SecondName: formValue.secondName,
      Surname: formValue.surname,
      SecondSurname: formValue.secondSurname,
      FullName: null,
      BirthDate: formValue.birthDate,
      DocumentTypeID: formValue.documentTypeID,
      DocumentNumber: formValue.documentNumber,
      Phone: formValue.phone,
      Address: formValue.address,
      AreaId: formValue.areaId,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false
    };

    this.docentService.createDocent(docent).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getDocents();
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

  //edit
  edit(formValue: any) {

    const docent: Idocent = {
      Id: this.docent.Id,
      FirstName: formValue.firstName,
      SecondName: formValue.secondName,
      Surname: formValue.surname,
      SecondSurname: formValue.secondSurname,
      FullName: this.docent.FullName,
      BirthDate: formValue.birthDate,
      DocumentTypeID: formValue.documentTypeID,
      DocumentNumber: formValue.documentNumber,
      Phone: formValue.phone,
      Address: formValue.address,
      AreaId: formValue.areaId,
      CreationTime: this.docent.CreationTime,
      CreatorUserId: this.docent.CreatorUserId,
      LastModificationTime: this.docent.LastModificationTime,
      LastModifierUserId: this.docent.LastModifierUserId,
      DeleterUserId: this.docent.DeleterUserId,
      DeletionTime: this.docent.DeletionTime,
      IsActive: this.docent.IsActive,
      IsDeleted: this.docent.IsDeleted
    };

    this.docentService.editDocent(docent).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getDocents();
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


  //delete
  delete(id: number) {

    Swal.fire({
      title: 'Esta seguro que desea eliminar el registro ?',
      text: "Los cambios no podran ser revertidos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        //delete service
        this.docentService.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getDocents();
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
    })
  }


  //create from set value ''
  setValueCreateFrom() {
    this.createDocentForm = this.form.group({
      id: [0, Validators.required],
      firstName: ['', Validators.required],
      secondName: [''],
      surname: ['', Validators.required],
      secondSurname: [''],
      fullName: [''],
      birthDate: ['', Validators.required],
      documentTypeID: ['', Validators.required],
      documentNumber: ['', Validators.required],
      phone: [''],
      address: ['', Validators.required],
      areaId: ['', Validators.required]
    });
  }

  //edit from set value ''
  setValueEditFrom() {
    this.editDocentForm = this.form.group({
      id: [0, Validators.required],
      firstName: ['', Validators.required],
      secondName: [''],
      surname: ['', Validators.required],
      secondSurname: [''],
      fullName: [''],
      birthDate: ['', Validators.required],
      documentTypeID: [0, Validators.required],
      documentNumber: ['', Validators.required],
      phone: [''],
      address: ['', Validators.required],
      areaId: [0, Validators.required]
    });
  }

}
