import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoaderService} from '../../core/_http/loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public appVersion;
  constructor(private router: Router, private loaderService: LoaderService) {
  }

  ngOnInit() {
    console.log('appVersion');
  }

  logout() {
    this.loaderService.status('Logout...');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedin');
    this.router.navigateByUrl('/auth');
  }
}
