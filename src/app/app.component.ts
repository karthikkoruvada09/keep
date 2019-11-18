import {Component, OnInit} from '@angular/core';
import {RecordsService} from "./services/records.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'forms';

  constructor(private ds: RecordsService) {
  }

  arr: any;
  pArray: Array<any> = [];
  uparr: Array<any> = [];

  ngOnInit() {
    this.ds.getData().subscribe(data => {
      this.arr = data;
      this.arr.forEach(record => {
        if (record.isUnpinned === true) {
          this.uparr.push(record);
        } else {
          this.pArray.push(record);
        }
      });
    });

  }


  saveMethod(data) {
    data.isUnpinned = true;
    this.ds.setDataFromLogin(data).subscribe(data1 => {
      console.log('data1: ', data1);
      this.arr = data1;
      this.uparr = [];
      this.pArray = [];
      this.arr.forEach(record => {
        if (record.isUnpinned === true) {
          this.uparr.push(record);
        } else {
          this.pArray.push(record);
        }
      });
    });
  }

  updateRecordpin(data) {
    data.isUnpinned = true;
    this.ds.setDataFromLogin(data).subscribe(data1 => {
      this.arr = data1;
      this.uparr = [];
      this.pArray = [];
      this.arr.forEach(record => {
        if (record.isUnpinned === true) {
          this.uparr.push(record);
        } else {
          this.pArray.push(record);
        }
      });
    });
  }

  updateRecordunpin(data) {
    data.isUnpinned = false;
    this.ds.setDataFromLogin(data).subscribe(data1 => {
      this.arr = data1;
      this.uparr = [];
      this.pArray = [];
      this.arr.forEach(record => {
        if (record.isUnpinned === true) {
          this.uparr.push(record);
        } else {
          this.pArray.push(record);
        }
      });
    });

  }
}
