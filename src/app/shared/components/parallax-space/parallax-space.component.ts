import { style } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-parallax-space',
  templateUrl: './parallax-space.component.html',
  styleUrls: ['./parallax-space.component.scss']
})
export class ParallaxSpaceComponent implements OnInit {
  //@ViewChild('#parallax') elem;
  elem;
  initialTop: number = 0;
  parallaxRatio: number = 1;
  constructor() {
    // Add event listener

  }

  ngOnInit(): void {
    this.elem = document.querySelector('#parallax')
  }
  // Magic happens here
  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event) {
    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;
    let _mouseX = event.clientX;
    let _mouseY = event.clientY;
    let _depth1 = `${50 - (_mouseX - _w) * 0.001}% ${50 - (_mouseY - _h) * 0.004}%`;
    let _depth2 = `${50 - (_mouseX - _w) * 0.002}% ${50 - (_mouseY - _h) * 0.008}%`;
    let _depth3 = `${50 - (_mouseX - _w) * 0.004}% ${50 - (_mouseY - _h) * 0.016}%`;
    let _depth4 = `${50 - (_mouseX - _w) * 0.002}% ${50 - (_mouseY - _h) * 0.008}%`;
    let _depth5 = `${50 - (_mouseX - _w) * 0.004}% ${50 - (_mouseY - _h) * 0.016}%`;
    let _depth6 = `${50 - (_mouseX - _w) * 0.008}% ${50 - (_mouseY - _h) * 0.032}%`;
    let x = `${_depth1}, ${_depth2},${_depth3}, ${_depth4}, ${_depth5}, ${_depth6}`;
    //console.log(x);
    this.elem.style.backgroundPosition = x;
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event) {
    this.elem.style.top = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px';
    /* this.eleRef.nativeElement.style.left = (window.scrollY / (10 * this.parallaxRatio)) + 'px' */
  }
}
