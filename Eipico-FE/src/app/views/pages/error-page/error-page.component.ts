import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit, OnDestroy {

  type: any;
  title: any;
  desc: any;
  private sub: Subscription;

  constructor(private route: ActivatedRoute ,private Location:Location) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.title = this.route.snapshot.paramMap.get('title');
    this.desc = this.route.snapshot.paramMap.get('desc');
    console.log(this.type);

    // this.sub = this.route.data.subscribe( (data:Data) => {
    //   console.log(data)
    //   if(data.type) {
    //     this.type = data.type;
    //   }
    //   if(data.title) {
    //     this.title = data['title'];
    //   }
    //   if(data.desc) {
    //     this.desc = data.desc
    //   }
    // });
    // switch(this.type) {
    //   case '400':
    //     if (!this.title) {
    //       this.title = 'Bad Req'
    //     }
    //     if (!this.desc) {
    //       this.desc = 'Oopps!! The page you were looking for doesn\'t exist.'
    //     }
    //     break;
    // case '404':
    //     if (!this.title) {
    //       this.title = 'Page Not Found'
    //     }
    //     if (!this.desc) {
    //       this.desc = 'Oopps!! The page you were looking for doesn\'t exist.'
    //     }
    //     break;
    //   case '0':
    //     if (!this.title) {
    //       this.title = 'Internal server error'
    //     }
    //     if (!this.desc) {
    //       this.desc = 'Oopps!! There wan an error. Please try agin later.'
    //     }
    //     break;
    //   default:
    //     // if (!this.type) {
    //       this.type = 'Ooops..';
    //     // }
    //     if (!this.title) {
    //       this.title = 'Something went wrong';
    //     }
    //     if (!this.desc) {
    //       this.desc = 'Looks like something went wrong.<br>' + 'We\'re working on it';
    //     }
    // }
  }
  back(){
    this.Location.back()
  }
	ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

}
