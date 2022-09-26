/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit,Input,Output,EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit,OnDestroy {
  img: string = ''
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string){
    this.img = newImg;

    //code
  }
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';
  // counter:number = 0;
  // counterFn:number|undefined;
  constructor() {

   }

   ngOnChanges(changes: SimpleChanges): void {

   }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(){

  }

  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded( ){
    this.loaded.emit(this.img);
  }

}
