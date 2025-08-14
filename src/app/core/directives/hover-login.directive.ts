import { Directive, ElementRef,HostListener } from '@angular/core';
import { style } from '@angular/animations';

@Directive({
  selector: '[appHoverLogin]'
})
export class HoverLoginDirective {

  constructor(private ElementRef:ElementRef) {
  }

  @HostListener('mouseover') onMouseOver(){
    this.ElementRef.nativeElement.style.left ='0%'

  }

  @HostListener('mouseout') onMouseOut(){
    this.ElementRef.nativeElement.style.left ='9%'

  }

}
