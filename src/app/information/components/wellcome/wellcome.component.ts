import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.scss']
})
export class WellcomeComponent {
  elem: HTMLElement | null;
  initialTop: number = 0;
  parallaxRatio: number = 5;
  parallaxHeight: number = 1;
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleUp = faAngleDoubleUp;
  apiLoaded = false;
  constructor() {
    this.elem = document.querySelector('#parallax');
  }



  // Magic happens here
  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event: any) {
    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;
    let _mouseX = event.clientX;
    let _mouseY = event.clientY;
    let _depth1 = `${50 + (_mouseX - _w) * this.parallaxHeight * 0.001}% ${50 + (_mouseY - _h) * this.parallaxHeight * 0.004}%`;
    let _depth2 = `${50 + (_mouseX - _w) * this.parallaxHeight * 0.002}% ${50 + (_mouseY - _h) * this.parallaxHeight * 0.008}%`;
    let _depth3 = `${50 + (_mouseX - _w) * this.parallaxHeight * 0.004}% ${50 + (_mouseY - _h) * this.parallaxHeight * 0.016}%`;
    let _depth4 = `${50 + (_mouseX - _w) * this.parallaxHeight * 0.008}% ${50 + (_mouseY - _h) * this.parallaxHeight * 0.032}%`;
    let x = `${_depth3},${_depth3},${_depth4},${_depth2}, ${_depth2}, ${_depth2}`;
    //console.log(x);
    this.elem ? this.elem.style.backgroundPosition = x : null;
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    this.elem ? this.elem.style.top = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px' : null;
    /* this.eleRef.nativeElement.style.left = (window.scrollY / (10 * this.parallaxRatio)) + 'px' */
  }

}
