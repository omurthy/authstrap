import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from './_services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showTiredMenu = false;
  showLogin = false;
  username?: string;
  items: MenuItem[] = [];
  itemsRight: MenuItem[] = [];
  home: MenuItem = {};

  constructor(private tokenStorageService: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showLogin = false;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }else{
      this.showLogin = true;
      this.showAdminBoard = false;
      this.showModeratorBoard = false;
    }

    this.itemsRight = [ 
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/user'],
      },
      {
        label: 'Login',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/login'],
        visible: this.showLogin,
      },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/register'],
        visible: this.showLogin,
      },
      {
        label: 'Profile Settings',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/profile'],
        visible: !this.showLogin,
      },
      {
        label: 'Admin Board',
        icon: 'pi pi-fw pi-calendar',
        routerLink: ['/admin'],
        visible: this.showAdminBoard
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-calendar',
        command: ()=>  this.logout(),
        visible: !this.showLogin
      }
    ];

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-align-justify',
        routerLink: ['/home'],
      }, 
      {
        label: 'Login',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/login'],
        visible: this.showLogin,
      },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/register'],
        visible: this.showLogin,
      },
      {
        label: 'Admin Board',
        icon: 'pi pi-fw pi-calendar',
        routerLink: ['/admin'],
        visible: this.showAdminBoard
      }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/home' };
  }

  checkAdminBoard() {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showLogin = false;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }else{
      this.showLogin = true;
      this.showAdminBoard = false;
      this.showModeratorBoard = false;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.showLogin = true;
    //this.router.navigate(['/login', 'login']);

    this.router.navigate(['login'])
    .then(() => {
      window.location.reload();
    });
  }
  visibleLogout() {
    this.showTiredMenu = true;
  }
}
