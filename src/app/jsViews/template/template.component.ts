import { Component, OnInit, ViewChild} from '@angular/core';
import { from } from 'rxjs';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  public editorValue: string = '';

  constructor() {}

  ngOnInit() {

  }
  

  
}
