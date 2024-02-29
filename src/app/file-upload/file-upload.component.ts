import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }

  handleFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  handleUpload(): void {
    if (!this.selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('fileToUpload', this.selectedFile);

    this.http.put('http://localhost:8080/upload', formData)
      .subscribe(() => {
        alert('File uploaded successfully');
      }, error => {
        alert('Error uploading file');
        console.error('Error uploading file:', error);
      });
  }
}
