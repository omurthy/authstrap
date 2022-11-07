import { Component, Directive, Input, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service'; 
import { PrayingService } from '../_services/praying.service';

 
@Component({
  selector: 'appLogin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  valCheck: string[] = ['remember'];

  @Input() prayingList! :any;
  password!: string;
   
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private prayingService: PrayingService) { }
   
  ngOnInit(): void {
    if(this.prayingList==null || this.prayingList.length==0)
     this.getPrayerTimes()
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  getPrayerTimes(){
    
    this.prayingService.getPrayingList().subscribe({
      next:data =>{
        this.prayingList = data.result 
      },
      error: err => {
        this.prayingList = JSON.parse(err.error).message;
      }
    })
  }
}
