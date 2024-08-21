import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CapitalizeCategoryPipe } from './pipes/capitalize-category.pipe';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmDialogComponent,
    CapitalizeCategoryPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    CategoryPipe,
    CapitalizeCategoryPipe,
  ]
})
export class SharedModule { }
