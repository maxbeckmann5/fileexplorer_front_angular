import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileListComponent } from './file-list/file-list.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
   ],
   declarations: [
      AppComponent,
      FileListComponent,
      FileUploadComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
