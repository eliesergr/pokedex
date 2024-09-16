import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SnavbarComponent } from './components/snavbar/snavbar.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidebarComponent,
    SnavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    SidebarComponent,
    SnavbarComponent
  ]
})
export class SharedModule { }
