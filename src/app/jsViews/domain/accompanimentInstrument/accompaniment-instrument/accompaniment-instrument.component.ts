import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { IdentificationData } from '../../../../models/domain/accompanimentInstrument/accompaniment-instrument';
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

  _currentPage: number = 1;

  identificationData = new IdentificationData();
  identificationDatas = new Array<IdentificationData>();

  regionals = new Array<Regional>();
  distrits = new Array<District>();
  centers = new Array<EducativeCenter>();
  tandas = new Array<Tanda>();
  grades = new Array<Grade>();
  docents = new Array<Docent>();
  docent = new Docent();
  currentUser = new CurrentUserInfo();
  visits = new Array<Visit>();

  docentDocumentNumber: string;

  userName: string;
  userDocumentNumber: string;

  //constructor
  constructor(
    private acompInstService: AccompanimentInstrumentService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }

  ngOnInit(): void {
    this.getRegionals();
    this.getTandas();
    this.getGrades();
    this.getDocents();
    this.getCurentUser();
    this.getVisits();
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
    this.commonService.getDistrictByRegionalId(id).subscribe((response: Array<District>) => {
      this.distrits = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getCenterByDistritId(id: string) {
    this.commonService.getEducativeCenterByDistrictId(id).subscribe((response: Array<EducativeCenter>) => {
      this.centers = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
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
        this.docentDocumentNumber = this.docent.DocumentNumber;
      },
        error => {
          console.log(JSON.stringify(error));
        });
    }
    this.docentDocumentNumber = "";
  }

  getCurentUser() {
    this.commonService.getCurrentUserInfo().subscribe((response: CurrentUserInfo) => {
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


  //open create modal
  openCreateAccompanimentInstrument(createModal) {
    this.setValueCreateIdentificationDataFrom();
    this.modalService.open(createModal, { size: 'xl', scrollable: true });
  }


  //create Identification Data from set value ''
  setValueCreateIdentificationDataFrom() {
    this.createIdentificationDataForm = this.form.group({
      id: ['', Validators.required],
      requestId: ['', Validators.required],
      regionalId: ['', Validators.required],
      distritId: ['', Validators.required],
      centerId: ['', Validators.required],
      tandaId: ['', Validators.required],
      gradeId: ['', Validators.required],
      docentId: ['', Validators.required],
      dompanionId: [''],

      visitIdA: ['',],
      visitDateA: ['',],
      quantityChildrenA: ['',],
      quantityGirlsA: ['',],
      expectedTimeA: ['',],
      realTimeA: ['',],

      visitIdB: ['',],
      visitDateB: ['',],
      quantityChildrenB: ['',],
      quantityGirlsB: ['',],
      expectedTimeB: ['',],
      realTimeB: ['',],

      visitIdC: ['',],
      visitDateC: ['',],
      quantityChildrenC: ['',],
      quantityGirlsC: ['',],
      expectedTimeC: ['',],
      realTimeC: ['',]
    });
  }

  //edit Identification Data from set value ''
  setValueEditIdentificationDataFrom() {
    this.editIdentificationDataForm = this.form.group({
      id: ['', Validators.required],
      requestId: ['', Validators.required],
      regionalId: ['', Validators.required],
      distritId: ['', Validators.required],
      centerId: ['', Validators.required],
      tandaId: ['', Validators.required],
      gradeId: ['', Validators.required],
      docentId: ['', Validators.required],
      dompanionId: [''],

      visitIdA: ['',],
      visitDateA: ['',],
      quantityChildrenA: ['',],
      quantityGirlsA: ['',],
      expectedTimeA: ['',],
      realTimeA: ['',],

      visitIdB: ['',],
      visitDateB: ['',],
      quantityChildrenB: ['',],
      quantityGirlsB: ['',],
      expectedTimeB: ['',],
      realTimeB: ['',],

      visitIdC: ['',],
      visitDateC: ['',],
      quantityChildrenC: ['',],
      quantityGirlsC: ['',],
      expectedTimeC: ['',],
      realTimeC: ['',]
    });
  }

}
