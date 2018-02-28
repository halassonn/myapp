import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSnackBarConfig,
  MatSnackBarVerticalPosition, MatSort, DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ProfileModel} from '../../../../model/profile.model';
import {ProfileService} from './services/profile.service';
import {LoaderService} from '../../../../core/_http/loader/loader.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import { Jsonp } from '@angular/http/src/http';
import { Profile } from 'selenium-webdriver/firefox';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {
  pageclass: any = 'page-container-full';
  displayedColumns: any;
  dataSource: any;
  profileDB: any;
  datasort: DataSourceSort | null;
  updateData = false;
  nik: string = localStorage.getItem('kodekantor');
  myDate: Date;

  showformadd = false;
  masakerja: any ;
  masakerjath: any ;
  masakerjabl: any ;

  tgm: any;
   tgls: any;
    ms: any;


  formaddkaryawan: FormGroup;

  profile: ProfileModel= new ProfileModel();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

   public file_srcs: string[] = [];

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

  constructor(private loaderService: LoaderService,
              private profileService: ProfileService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private datePipe: DatePipe) {
    this.displayedColumns = ['nik', 'nama', 'jenkel', 'tempatlahir', 'jabatan', 'statuskaryawan','actions'];
  }

  ngOnInit() {
    this.profileService.getEmittedValue().subscribe(
      (data) => {
        this.pageclass = data;
      }
    );
    this.getAllProfiles(null, null);
    this.buildform(null);
  }

  buildform(data: ProfileModel) {
    if (data == null) {
      this.formaddkaryawan = this.fb.group({
        'id': ['', Validators.required],
        'nik': [{value: this.nik, disabled: true}, Validators.required],
        'nama': ['', Validators.required],
        'tempatlahir' : ['', Validators.required],
        'alamat' : ['', Validators.required],
        'tgllahir' : ['', Validators.required],
        'jabatan' : ['', Validators.required],
        'jenkel': ['', Validators.required],
        'agama': ['', Validators.required],
        'status': ['', Validators.required],
        'statuskaryawan': ['', Validators.required],
        'tglmasuk': ['', Validators.required],
      });
      this.masakerja = '';
    }else {
      this.formaddkaryawan = this.fb.group({
        'id': [this.profile.id, Validators.required],
        'nik': [{value: this.profile.nik, disabled: true}],
        'nama': [this.profile.nama, Validators.required],
        'tempatlahir' : [this.profile.tempatlahir, Validators.required],
        'alamat' : [this.profile.alamat, Validators.required],
        'tgllahir' : [new Date(this.profile.tgllahir), Validators.required],
        'jabatan' : [this.profile.jabatan, Validators.required],
        'jenkel' : [this.profile.jenkel, Validators.required],
        'agama': [this.profile.agama, Validators.required],
        'status': [this.profile.status, Validators.required],
        'statuskaryawan': [this.profile.statuskaryawan, Validators.required],
        'tglmasuk': [new Date(this.profile.tglmasuk), Validators.required]
      });
      this.masakerja = this.profile.masakerja;
    }
  }

  doSomething(newDate) {
    this.newnik(newDate);
  }


  getAllProfiles(by: any, param: any) {
    this.loaderService.status('Fetch Data Karyawan...');
     this.profileDB = new Database(this.profileService, this.loaderService, by, param);

    // pagination
     this.datasort = new DataSourceSort(this.profileDB, this.sort, this.paginator);
     this.dataSource = this.datasort;
    console.log('data' + this.profileDB);
  }

  imageUploaded(file: any) {
    this.file_srcs = file.src;
    this.profile.foto = file.src.replace('data:image/png;base64,', '');
    // console.log(file.src.replace('data:image/png;base64,',''))
  }

  imageRemove(file: any) {
    this.file_srcs = null;
  }

  savedata(event) {
    this.profile = event.value;
    this.profile.nik = this.nik;
    this.profile.nama = this.formaddkaryawan.value.nama;
    this.profile.alamat = this.formaddkaryawan.value.alamat;
    this.profile.tempatlahir = this.formaddkaryawan.value.tempatlahir;
    this.profile.tgllahir = this.formaddkaryawan.value.tgllahir;
    this.profile.jabatan = this.formaddkaryawan.value.jabatan;
    this.profile.jenkel = this.formaddkaryawan.value.jenkel;
    this.profile.status = this.formaddkaryawan.value.status;
    this.profile.statuskaryawan = this.formaddkaryawan.value.statuskaryawan;
    this.profile.agama = this.formaddkaryawan.value.agama;
    this.profile.tglmasuk = this.formaddkaryawan.value.tglmasuk;
    this.profile.masakerja = this.masakerja;

    console.log(this.profile);
    this.profileService.saveDatakaryawan(this.profile).subscribe(
      (res) => {
        this.getAllProfiles(null, null);
      },
      (err) => {
        this.snackBar.open(err, '', this.snackBarErrorConf);
      }

    );
  }
  newnik(event) {
    console.log(
      localStorage.getItem('kodekantor').concat(
      this.datePipe.transform(event.value, 'dd/MM/yyyy').substr(3, 2)
      .concat(this.datePipe.transform(event.value, 'dd/MM/yyyy').substr(6, 4))
      )
    );
    this.nik = localStorage.getItem('kodekantor').concat(
      this.datePipe.transform(event.value, 'dd/MM/yyyy').substr(3, 2)
      .concat(this.datePipe.transform(event.value, 'dd/MM/yyyy').substr(6, 4))
      );
     // this.buildform( null);

  }
  getmasakerja(event) {

    const tgl1: any =  this.datePipe.transform(event.value, 'dd-MM-yyyy');
    const tgl2: any  = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

    console.log ('tgl1 ' + tgl1);
    console.log ('tgl2 ' + tgl2);
    const parts1 = tgl1.split('-');
    const date1: any = new Date(parseInt(parts1[2], 10),     // year

                    parseInt(parts1[1], 10) - 1, // month, starts with 0

                    parseInt(parts1[0], 10));    // day
                    console.log ('date1 ' + date1);


   const parts2 = tgl2.split('-');

   const date2: any = new Date(parseInt(parts2[2], 10),     // year

                    parseInt(parts2[1], 10) - 1, // month, starts with 0

                    parseInt(parts2[0], 10));    // day
                    console.log ('date2 ' + date2);

  let yeardiff = 0;

   let monthdiff = 0;

   let daydiff = 0;

   let weekdiff = 0;

   yeardiff = parseInt(parts2[2], 10) - parseInt(parts1[2], 10);
   console.log ('yeardiff ' + yeardiff);

   if (yeardiff > 0) {

    // Change Year

    monthdiff = parseInt(parts2[1], 10) + 12 - parseInt(parts1[1], 10);
    console.log ('monthdiff ' + monthdiff);
   }else {

    monthdiff = parseInt(parts2[1], 10) - parseInt(parts1[1], 10);
    console.log ('monthdiff ' + monthdiff);
   }

   if (monthdiff > 0) {

    if (parseInt(parts2[0], 10) >= parseInt(parts1[0], 10)) {

     daydiff = parseInt(parts2[0], 10) - parseInt(parts1[0], 10);
     console.log ('daydiff ' + daydiff);
    }else {

     monthdiff--;

      const diff: any  = new Date(date2 - date1),

        daydiff  = diff / 1000 / 60 / 60 / 24;
        console.log ('daydiff ' + daydiff);
    }

   } else {

    daydiff = parseInt(parts2[0], 10) - parseInt(parts1[0], 10);
    console.log ('daydiff ' + daydiff);
   }
   if (daydiff >= 7) {

    weekdiff = Math.floor(daydiff / 7);

    daydiff = daydiff % 7;
    console.log ('daydiff ' + daydiff);
   }

   const tahun = yeardiff;
   const bulan = monthdiff;
   const hari = daydiff;
   const weekly = weekdiff;




   console.log (hari  + ' Hari ' + weekly  + ' Minggu ' + bulan + ' Bulan ' + tahun + ' tahun ');
    this.masakerja = bulan;
    //this.masakerjath = parseInt((bulan / 12).toString(),10);
    this.masakerjath = tahun;
    this.masakerjabl = bulan - (parseInt((bulan / 12).toString(), 10) * 12);


  }

  openside() {
    this.profileService.sideOpen();
  }
  closeside() {
    this.profileService.sideclose();
  }
  showDetail(profile: ProfileModel) {
    this.profile = profile;
    console.log(this.profile);
    this.updateData = !this.updateData;
    this.openformkaryawan();
    this.buildform(profile);
    this.masakerja = profile.masakerja;
    this.masakerjath = parseInt((this.masakerja / 12).toString(),10);
    this.masakerjabl = this.masakerja - (parseInt((this.masakerja / 12).toString(),10)*12);
  }

  openformkaryawan() {
    this.showformadd = !this.showformadd;
    console.log('open form');
  }




}

// database
export class Database {

  dataChange: BehaviorSubject<ProfileModel[]> = new BehaviorSubject<ProfileModel[]>([]);

  constructor(private profile: ProfileService, private loaderService: LoaderService, by: any, param: any) {
    // Fill up the database.
    if (param !== null) {
      this.loaderService.status('Get All Data By ' + param + ' ......');
      this.profile.getAllDataKaryawanBy(by, param).subscribe((data) => this.dataChange.next(data));
    } else {
      this.loaderService.status('Get All Data ...');
      this.profile.getAllDataKaryawan().subscribe(
        (data) => {
          this.dataChange.next(data);
          // console.log(data);
        },
        (error) => {

        }
      );
    }

  }

  get data(): ProfileModel[] {
    return this.dataChange.value;
  }
}

export class DataSourceSort extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  constructor(private _database: Database, private _sort: MatSort, private _paginator: MatPaginator) {
    super();
  }

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  connect(): Observable<ProfileModel[]> {
    const displayDataChanges = [
      this._database.dataChange,
      this._paginator.page,
      this._sort.sortChange,
      this._filterChange
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._database.data.slice();
      console.log('a' + data);

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize)
        .sort((a, b) => {
          const propertyA: number | string = '';
          const propertyB: number | string = '';
    /*switch (this._sort.active) {
            case 'nik':
              [propertyA, propertyB] = [a.nik, b.nik];
              break;
            case 'nama':
              [propertyA, propertyB] = [a.nama, b.nik];
              break;
            case 'jenkel':
              [propertyA, propertyB] = [a.jenkel, b.jenkel];
              break;
            case 'tempatlahir':
              [propertyA, propertyB] = [a.tempatlahir, b.tempatlahir];
              break;
            case 'jabatan':
              [propertyA, propertyB] = [a.jabatan, b.jabatan];
              break;
            case 'statuskaryawan':
              [propertyA, propertyB] = [a.statuskaryawan, b.statuskaryawan];
              break;
          }*/

          const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
          const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

          return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);


        })
        .filter((item: ProfileModel) => {
          const searchStr = (item.nik + item.nama).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });
    });


  }

  disconnect() {
  }

}


