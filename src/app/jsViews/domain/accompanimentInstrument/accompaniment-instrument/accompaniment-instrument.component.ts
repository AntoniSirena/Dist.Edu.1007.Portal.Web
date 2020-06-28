import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { IdentificationData, AccompInstRequest, VariableRequest } from '../../../../models/domain/accompanimentInstrument/accompaniment-instrument';
import { AccompanimentInstrumentService } from '../../../../services/domain/accompanimentInstrument/accompaniment-instrument.service';
import { CommonService } from '../../../../services/common/common.service';
import { Regional } from '../../../../models/common/regional/regional';
import { District } from '../../../../models/common/district/district';
import { EducativeCenter } from '../../../../models/common/educativeCenter/educative-center';
import { Tanda } from '../../../../models/common/tanda/tanda';
import { Grade } from '../../../../models/common/grade/grade';
import { Docent } from '../../../../models/common/docent/docent';
import { CurrentUserInfo } from '../../../../models/common/currentUserInfo/current-user-info';
import { Visit } from '../../../../models/common/visit/visit';
import { IidentificationData } from '../../../../interfaces/domain/IccompanimentInstrument/iaccompaniment-instrument';
import { Observable } from 'rxjs';
import { Area } from '../../../../models/common/area/area';
import { Indicator } from '../../../../models/common/indicator/indicator';


@Component({
  selector: 'app-accompaniment-instrument',
  templateUrl: './accompaniment-instrument.component.html',
  styleUrls: ['./accompaniment-instrument.component.css'],
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
export class AccompanimentInstrumentComponent implements OnInit {

  createIdentificationDataForm: FormGroup;
  editIdentificationDataForm: FormGroup;

  editVariableAForm: FormGroup;


  _currentPage: number = 1;

  identificationDatas = new Array<IdentificationData>();
  regionals = new Array<Regional>();
  distrits = new Array<District>();
  centers = new Array<EducativeCenter>();
  tandas = new Array<Tanda>();
  grades = new Array<Grade>();
  docents = new Array<Docent>();
  currentUser = new CurrentUserInfo();
  visits = new Array<Visit>();
  areas = new Array<Area>();
  indicators = new Array<Indicator>();
  accompInstRequests = new Array<AccompInstRequest>();

  identificationData = new IdentificationData();
  docent = new Docent();

  docentFullName: string;
  docentDocumentNumber: string;

  userName: string;
  userDocumentNumber: string;

  //Variables
  variable = new VariableRequest();


  //constructor
  constructor(
    private acompInstService: AccompanimentInstrumentService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private form: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAccompInstRequests();
    this.getRegionals();
    this.getTandas();
    this.getGrades();
    this.getDocents();
    this.getCurentUser();
    this.getVisits();
    this.getAreas();
    this.getIndicators();
    this.getVariableByRequestId(35, 'A');
  }


  /* Region de Identification Data*/

  getIdentificationDataById(id: string) {
    this.acompInstService.getIdentificationDataById(id).subscribe((response: IdentificationData) => {
      this.identificationData = response;

      this.getDistritByRegionId(this.identificationData.RegionalId.toString());
      this.getCenterByDistritId(this.identificationData.DistritId.toString());
      this.getDocentById(this.identificationData.DocentId.toString());
      this.getCurentUser(Number(this.identificationData.CreatorUserId));


      //llenando el modal
      this.editIdentificationDataForm = this.form.group({
        id: [`${this.identificationData.Id}`],
        requestId: [`${this.identificationData.RequestId}`],
        regionalId: [`${this.identificationData.RegionalId}`, Validators.required],
        distritId: [`${this.identificationData.DistritId}`, Validators.required],
        centerId: [`${this.identificationData.CenterId}`, Validators.required],
        tandaId: [`${this.identificationData.TandaId}`, Validators.required],
        gradeId: [`${this.identificationData.GradeId}`, Validators.required],
        docentId: [`${this.identificationData.DocentId}`, Validators.required],
        dompanionId: [`${this.identificationData.CompanionId}`],

        visitIdA: [`${this.identificationData.VisitIdA}`],
        visitDateA: [`${this.identificationData.VisitDateA}`],
        quantityChildrenA: [`${this.identificationData.QuantityChildrenA}`],
        quantityGirlsA: [`${this.identificationData.QuantityGirlsA}`],
        expectedTimeA: [`${this.identificationData.ExpectedTimeA}`],
        realTimeA: [`${this.identificationData.RealTimeA}`],

        visitIdB: [`${this.identificationData.VisitIdB}`],
        visitDateB: [`${this.identificationData.VisitDateB}`],
        quantityChildrenB: [`${this.identificationData.QuantityChildrenB}`],
        quantityGirlsB: [`${this.identificationData.QuantityGirlsB}`],
        expectedTimeB: [`${this.identificationData.ExpectedTimeB}`],
        realTimeB: [`${this.identificationData.RealTimeB}`],

        visitIdC: [`${this.identificationData.VisitIdC}`],
        visitDateC: [`${this.identificationData.VisitDateC}`],
        quantityChildrenC: [`${this.identificationData.QuantityChildrenC}`],
        quantityGirlsC: [`${this.identificationData.QuantityGirlsC}`],
        expectedTimeC: [`${this.identificationData.ExpectedTimeC}`],
        realTimeC: [`${this.identificationData.RealTimeC}`]
      });

    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getAccompInstRequests() {
    this.acompInstService.getAccompInstRequest().subscribe((response: Iresponse) => {

      if (response.Code == '000') {
        this.accompInstRequests = response.Data;
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 5000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getRegionals() {
    this.commonService.getRegionals().subscribe((response: Array<Regional>) => {
      this.regionals = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getDistritByRegionId(id: string) {
    if (id != "") {
      this.commonService.getDistrictByRegionalId(id).subscribe((response: Array<District>) => {
        this.distrits = response;
      },
        error => {
          console.log(JSON.stringify(error));
        });
    }
  }

  getCenterByDistritId(id: string) {
    if (id != "") {
      this.commonService.getEducativeCenterByDistrictId(id).subscribe((response: Array<EducativeCenter>) => {
        this.centers = response;
      },
        error => {
          console.log(JSON.stringify(error));
        });
    }
  }

  getTandas() {
    this.commonService.getTandas().subscribe((response: Array<Tanda>) => {
      this.tandas = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getGrades() {
    this.commonService.getGrades().subscribe((response: Array<Grade>) => {
      this.grades = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getDocents() {
    this.commonService.getDocents().subscribe((response: Array<Docent>) => {
      this.docents = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getDocentById(id: string) {
    if (id != "") {
      this.commonService.getDocentById(id).subscribe((response: Docent) => {
        this.docent = response;
        this.docentFullName = this.docent.FullName;
        this.docentDocumentNumber = this.docent.DocumentNumber;
      },
        error => {
          console.log(JSON.stringify(error));
        });
    }
    this.docentDocumentNumber = "";
  }

  getCurentUser(id: number = 0) {
    this.commonService.getCurrentUserInfo(id).subscribe((response: CurrentUserInfo) => {
      this.currentUser = response;
      this.userName = this.currentUser.FullName;
      this.userDocumentNumber = this.currentUser.DocumentNumber;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getVisits() {
    this.commonService.getVisits().subscribe((response: Array<Visit>) => {
      this.visits = response;
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

  getIndicators() {
    this.commonService.getIndicators().subscribe((response: Array<Indicator>) => {
      this.indicators = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //Create variables
  createVariable(identificationDataId: number) {
    this.acompInstService.createVariable(identificationDataId).subscribe((result: object) => {
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //Get variables
  getVariableByRequestId(requestId: number, variable: string) {
    this.acompInstService.getVariableByRequestId(requestId, variable).subscribe((response: VariableRequest) => {
      this.variable = response;
      console.log(this.variable);
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }



  //open create modal
  openCreateAccompanimentInstrumentModal(createModal) {
    this.docentDocumentNumber = "";
    this.setValueCreateIdentificationDataFrom();
    this.modalService.open(createModal, { size: 'xl', scrollable: true });
  }

  //open edit modal
  openEditAccompanimentInstrumentModal(editModal, id: string) {
    this.getIdentificationDataById(id);
    this.setValueEditIdentificationDataFrom();
    this.setValueEditVariableAForm();
    this.modalService.open(editModal, { size: 'xl', scrollable: true });
  }


  //create Identification Data
  createIdentificationData(formValue: any) {
    const identificationData: IidentificationData = {
      Id: 0,
      RequestId: 0,
      RegionalId: formValue.regionalId,
      DistritId: formValue.distritId,
      CenterId: formValue.centerId,
      TandaId: formValue.tandaId,
      GradeId: formValue.gradeId,
      DocentId: formValue.docentId,
      CompanionId: this.currentUser.Id,

      VisitIdA: formValue.visitIdA || this.docents[0].Id,
      VisitDateA: formValue.visitDateA || null,
      QuantityChildrenA: formValue.quantityChildrenA || 0,
      QuantityGirlsA: formValue.quantityGirlsA || 0,
      ExpectedTimeA: formValue.expectedTimeA || 0,
      RealTimeA: formValue.realTimeA || 0,

      VisitIdB: this.visits[3].Id,
      VisitDateB: formValue.visitDateB || null,
      QuantityChildrenB: formValue.quantityChildrenB || 0,
      QuantityGirlsB: formValue.quantityGirlsB || 0,
      ExpectedTimeB: formValue.expectedTimeB || 0,
      RealTimeB: formValue.realTimeB || 0,

      VisitIdC: this.visits[3].Id,
      VisitDateC: formValue.visitDateC || null,
      QuantityChildrenC: formValue.quantityChildrenC || 0,
      QuantityGirlsC: formValue.quantityGirlsC || 0,
      ExpectedTimeC: formValue.expectedTimeC || 0,
      RealTimeC: formValue.realTimeC || 0,

      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false
    };

    this.acompInstService.createIdentificationData(identificationData).subscribe((response: Iresponse) => {
      console.log(response.Data);
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getAccompInstRequests();
          this.modalService.dismissAll();
        });

        //Create variables
        this.createVariable(response.Data);

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


  //edit Identification Data
  editIdentificationData(formValue: any) {

    const identificationData: IidentificationData = {
      Id: this.identificationData.Id,
      RequestId: this.identificationData.RequestId,
      RegionalId: formValue.regionalId,
      DistritId: formValue.distritId,
      CenterId: formValue.centerId,
      TandaId: formValue.tandaId,
      GradeId: formValue.gradeId,
      DocentId: formValue.docentId,
      CompanionId: this.currentUser.Id,

      VisitIdA: formValue.visitIdA,
      VisitDateA: formValue.visitDateA,
      QuantityChildrenA: formValue.quantityChildrenA,
      QuantityGirlsA: formValue.quantityGirlsA,
      ExpectedTimeA: formValue.expectedTimeA,
      RealTimeA: formValue.realTimeA,

      VisitIdB: formValue.visitIdB,
      VisitDateB: formValue.visitDateB,
      QuantityChildrenB: formValue.quantityChildrenB,
      QuantityGirlsB: formValue.quantityGirlsB,
      ExpectedTimeB: formValue.expectedTimeB,
      RealTimeB: formValue.realTimeB,

      VisitIdC: formValue.visitIdC,
      VisitDateC: formValue.visitDateC,
      QuantityChildrenC: formValue.quantityChildrenC,
      QuantityGirlsC: formValue.quantityGirlsC,
      ExpectedTimeC: formValue.expectedTimeC,
      RealTimeC: formValue.realTimeC,

      CreatorUserId: this.identificationData.CreatorUserId,
      CreationTime: this.identificationData.CreationTime,
      LastModifierUserId: this.identificationData.LastModifierUserId,
      LastModificationTime: this.identificationData.LastModificationTime,
      DeleterUserId: this.identificationData.DeleterUserId,
      DeletionTime: this.identificationData.DeletionTime,
      IsActive: this.identificationData.IsActive,
      IsDeleted: this.identificationData.IsDeleted
    };

    console.log(identificationData);
    this.acompInstService.editIdentificationData(identificationData).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getAccompInstRequests();
          //this.modalService.dismissAll();
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


  //create Identification Data from set value ''
  setValueCreateIdentificationDataFrom() {
    this.createIdentificationDataForm = this.form.group({
      id: [`${this.docents[0].Id}`],
      requestId: [''],
      regionalId: ['', Validators.required],
      distritId: ['', Validators.required],
      centerId: ['', Validators.required],
      tandaId: ['', Validators.required],
      gradeId: ['', Validators.required],
      docentId: ['', Validators.required,],
      dompanionId: [''],

      visitIdA: { value: `${this.visits[0].Id}`, disabled: true },
      visitDateA: [''],
      quantityChildrenA: [''],
      quantityGirlsA: [''],
      expectedTimeA: [''],
      realTimeA: [''],

      visitIdB: [{ value: `${this.visits[3].Id}`, disabled: true }],
      visitDateB: [''],
      quantityChildrenB: [''],
      quantityGirlsB: [''],
      expectedTimeB: [''],
      realTimeB: [''],

      visitIdC: [{ value: `${this.visits[3].Id}`, disabled: true }],
      visitDateC: [''],
      quantityChildrenC: [''],
      quantityGirlsC: [''],
      expectedTimeC: [''],
      realTimeC: ['']
    });
  }

  //edit Identification Data from set value ''
  setValueEditIdentificationDataFrom() {
    this.editIdentificationDataForm = this.form.group({
      id: [''],
      requestId: [''],
      regionalId: ['', Validators.required],
      distritId: ['', Validators.required],
      centerId: ['', Validators.required],
      tandaId: ['', Validators.required],
      gradeId: ['', Validators.required],
      docentId: [{ value: '', disabled: true }, Validators.required],
      dompanionId: [''],

      visitIdA: { value: '', disabled: true },
      visitDateA: [''],
      quantityChildrenA: [''],
      quantityGirlsA: [''],
      expectedTimeA: [''],
      realTimeA: [''],

      visitIdB: [''],
      visitDateB: [''],
      quantityChildrenB: [''],
      quantityGirlsB: [''],
      expectedTimeB: [''],
      realTimeB: [''],

      visitIdC: [''],
      visitDateC: [''],
      quantityChildrenC: [''],
      quantityGirlsC: [''],
      expectedTimeC: [''],
      realTimeC: ['']
    });
  }


  //edit Variable A from set value ''
  setValueEditVariableAForm() {
    this.editVariableAForm = this.form.group({
      id: [''],
      number: [''],
      description: [''],
      areaIdA: [this.variable.VariableDetails[0].AreaIdA],
      indicadorIdA: [this.variable.VariableDetails[0].IndicadorIdA],
      areaIdB: [this.variable.VariableDetails[0].AreaIdC],
      indicadorIdB: [this.variable.VariableDetails[0].IndicadorIdB],
      areaIdC: [this.variable.VariableDetails[0].AreaIdC],
      indicadorIdC: [this.variable.VariableDetails[0].IndicadorIdC],
    });
  }



  /* End region */






}
