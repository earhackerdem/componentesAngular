import { Component, OnInit,Input,Output,EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit,OnDestroy {
  img: string = ''
  @Input('img')
  set changeImg(newImg: string){
    this.img = newImg;
    console.log("change just image =>",this.img)
    //code
  }
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';
  counter:number = 0;
  counterFn:number|undefined;
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
    this.counterFn = window.setInterval(()=>{
      this.counter +=1;
      console.log('run counter')
    },1000);
  }

  ngAfterViewInit(): void {
      //after render
      //children handler
      console.log("ngAfterViewInit",'imgValue =>',this.img)
  }

  ngOnDestroy(){
    console.log("ngOnDestroy",'imgValue =>',this.img)
    window.clearInterval(this.counterFn)
  }

  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded( ){
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
