import { Component, OnInit,Input,Output,EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit,OnDestroy {
  @Input() img: string = "";
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';
  constructor() {
    //before render
    //No async -- once time
    console.log("constructor",'imgValue =>',this.img);
   }

   ngOnChanges(changes: SimpleChanges): void {
   //before render
   //changes inputs -- nTimes
   console.log("ngOnChanges",'imgValue=>',this.img)
   }

  ngOnInit(): void {
    //before render
    //async - fetch -- one time
    console.log("ngOnInit",'imgValue =>',this.img);
  }

  ngAfterViewInit(): void {
      //after render
      //children handler
      console.log("ngAfterViewInit",'imgValue =>',this.img)
  }

  ngOnDestroy(){
    console.log("ngOnDestroy",'imgValue =>',this.img)
  }

  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded( ){
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
