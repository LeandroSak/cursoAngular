import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTitleSize]'
})
export class TitleSizeDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.fontSize = '20px';
   }
  
   
  
}
