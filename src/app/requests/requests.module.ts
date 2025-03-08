import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsPageComponent } from './requests-page/requests-page.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { RequestsAddFormComponent } from './requests-add-form/requests-add-form.component';
import { RequestItemComponent } from './request-item/request-item.component';



@NgModule({
  declarations: [
    RequestsPageComponent,
    RequestsListComponent,
    RequestsAddFormComponent,
    RequestItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RequestsPageComponent
  ]
})
export class RequestsModule { }
