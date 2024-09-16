import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityPipe } from './security.pipe';



@NgModule({
  declarations: [
    SecurityPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SecurityPipe
  ]
})
export class PipesModule { }
