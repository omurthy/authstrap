import { trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Prying, PryingTimes } from '../_models/prying';
import { PrayingService } from '../_services/praying.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  cols: any[] = []; 
  prayingList: any[]=[];
  constructor(private userService: UserService,private prayingService: PrayingService) { }
  @Output() prayingEvent = new EventEmitter<string>();
  ngOnInit(): void {
    this.getPrayerTimes()
    this.getPublicContents()
    this.cols = [
      { field: 'vakit', header: 'Vakit' },
      { field: 'saat', header: 'Saat' }, 
  ];
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
  getPublicContents(){
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }
}
