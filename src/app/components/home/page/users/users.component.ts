import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LoaderService} from '../../../../core/_http/loader/loader.service';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarConfig} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Users, UserDetails } from '../../../../model/users.model';
import { UsersService } from './services/users.service';
import { DatakantorModel } from '../../../../model/datakantor.model';
import { DatakantorService } from '../datakantor/serivces/datakantor.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  
})
export class UsersComponent implements OnInit {
  pageclass: any = 'page-container-full';
  displayedColumns: any;
  usersDB: any;
  dataSource: any;
  userssort: UsersSorts | null;
  formuser: FormGroup;
  user: Users;
  userDetails: UserDetails;
  datakantor: any;

  updateData: Boolean = false;
  password: any = 'pass-hidden';

  


  matSnackBarVerticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarSuccesConf: MatSnackBarConfig = {
    duration: 3000,
    extraClasses: ['success-snackbar'],
    verticalPosition: this.matSnackBarVerticalPosition
  };
  snackBarErrorConf: MatSnackBarConfig = {
    duration: 3000,
    extraClasses: ['error-snackbar'],
    verticalPosition: this.matSnackBarVerticalPosition
  };


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  constructor(private loaderService: LoaderService,
    private userservice: UsersService,private datakantorservice:DatakantorService,
  private fb: FormBuilder,
private snackbar: MatSnackBar) {
this.displayedColumns = ['nik', 'nama', 'email', 'jabatan', 'actions'];

this.datakantorservice.getAllDataKantor().subscribe((data) => {
  this.datakantor = data;
});
}


  ngOnInit() {
    this.userservice.getEmittedValue().subscribe(
      (data) => {
        this.pageclass = data;
      }
    );

    this.getAllUsers(null, null);
    this.buildform(null);
  }
  buildform(data: Users) {
    if (data === null) {
      this.formuser = this.fb.group({
        'username': ['', Validators.required],
        'nik': ['', Validators.required],
        'firstname': ['', Validators.required],
        'lastname' : ['', Validators.required],
        'email' : ['', Validators.required],
        'jabatan' : ['', Validators.required],
        'password': ['', Validators.required],
        'password2' : ['', Validators.required],
        'selected_kd_kantor' : ['', Validators.required]
      });
    }else {
      this.formuser = this.fb.group({
        'selected_kd_kantor': [this.user.userDetails.dataKantor.kodekantor],
        'username': [this.user.username, Validators.required],
        'nik': [this.user.userDetails.nik, Validators.required],
        'firstname': [this.user.userDetails.firstname, Validators.required],
        'lastname' : [this.user.userDetails.lastname, Validators.required],
        'email' : [this.user.userDetails.email, Validators.required],
        'jabatan' : [this.user.userDetails.jabatan, Validators.required],
        'password': ['', Validators.required],
        'password2' : ['', Validators.required],
      });
    }
  }

  getAllUsers(by: any, param: any) {
    this.loaderService.status('Fetch Data Karyawan...');
     this.usersDB = new UsersDatabase(this.userservice, this.loaderService, by, param);

    // pagination
     this.userssort = new UsersSorts(this.usersDB, this.sort, this.paginator);
     this.dataSource = this.userssort;
     console.log(this.dataSource);
  }
  showDetail(users: Users) {
    this.user = users;
    console.log(this.user);
    this.updateData = !this.updateData;
    this.openside();
    this.buildform(users);
    this.password = 'pass-hidden';


  }
  batal() {
    this.buildform(null);
    if(this.updateData === true){
      this.updateData = !this.updateData;
      console.log(this.updateData);
    }
  }
  openside() {
    this.userservice.sideOpen();
    this.buildform(null);
    this.password = 'mat-form-field';
  }
  closeside() {
    this.userservice.sideclose();
    this.buildform(null);
    if(this.updateData === true){
      this.updateData = !this.updateData;
      console.log(this.updateData);
    }

  }



}


// database
export class UsersDatabase {

  dataChange: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>([]);

  constructor(private userservice: UsersService, private loaderService: LoaderService, by: any, param: any) {
    // Fill up the database.
    if (param !== null) {
      this.loaderService.status('Get All Users By ' + param + ' ......');
      this.userservice.getAllDataUsersBy(by, param).subscribe(
        (data) => { this.dataChange.next(data);
        }
      );
    } else {
      this.loaderService.status('Get All Users ...');
      this.userservice.getAllDataUsers().subscribe((data) => this.dataChange.next(data));
    }

  }

  get data(): Users[] {
    return this.dataChange.value;
  }
}

// datasource

export class UsersSorts extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  constructor(private _datausersdb: UsersDatabase, private _sort: MatSort, private _paginator: MatPaginator) {
    super();
  }

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  connect(): Observable<Users[]> {
    const displayDataChanges = [
      this._datausersdb.dataChange,
      this._paginator.page,
      this._sort.sortChange,
      this._filterChange
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._datausersdb.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize)
        .sort((a, b) => {
          const propertyA: number | string = '';
          const propertyB: number | string = '';

          /*switch (this._sort.active) {
            case 'kodekantor':
              [propertyA, propertyB] = [a.kodekantor, b.kodekantor];
              break;
            case 'namakantor':
              [propertyA, propertyB] = [a.namakantor, b.namakantor];
              break;
            case 'alamat':
              [propertyA, propertyB] = [a.alamat, b.alamat];
              break;
            case 'kodepos':
              [propertyA, propertyB] = [a.kodepos, b.kodepos];
              break;

          } */

          const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
          const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

          return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);


        })
        .filter((item: Users) => {
          const searchStr = (item.id + item.username.toLowerCase());
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });
    });


  }

  disconnect() {
  }

}
