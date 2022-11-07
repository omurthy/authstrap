import { Component } from '@angular/core';
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
  username?: string;
  items : MenuItem[]=[];
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
    this.items = [
      {
          label:'File',
          icon:'pi pi-fw pi-file',
          items:[
              {
                  label:'New',
                  icon:'pi pi-fw pi-plus',
                  items:[
                  {
                      label:'Bookmark',
                      icon:'pi pi-fw pi-bookmark'
                  },
                  {
                      label:'Video',
                      icon:'pi pi-fw pi-video'
                  },

                  ]
              },
              {
                  label:'Delete',
                  icon:'pi pi-fw pi-trash'
              },
              {
                  separator:true
              },
              {
                  label:'Export',
                  icon:'pi pi-fw pi-external-link'
              }
          ]
      } ,
      {
          label:'Quit',
          icon:'pi pi-fw pi-power-off'
      }
  ];
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
