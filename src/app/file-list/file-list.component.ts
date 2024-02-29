import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  files: any[] = [];
  filteredFiles: any[] = [];
  currentPath: string = '';
  searchTerm: string = '';
  currentFolder: string = 'Home';

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(path: string = ''): void {
    this.fileService.getFiles(path).subscribe(
      (data: any[]) => {
        this.files = data.map(file => {
          console.log('siehe hier:'+ this.currentPath);
          file.path = this.currentPath ? `${this.currentPath}/${file.name}` : file.name;
          return file;
        });
        this.currentPath = path;
        this.files.forEach(file => {
          // For each file, get attributes from the backend
          this.getFileAttributes(file.name);
        });
        // Sortiere die Dateien so, dass Ordner vor Dateien erscheinen und ansonsten alphabetisch nach Dateinamen
        this.files.sort((a, b) => {
          if (a.directory && !b.directory) {
            return -1; // Ordner "a" kommt vor Datei "b"
          } else if (!a.directory && b.directory) {
            return 1; // Datei "b" kommt vor Ordner "a"
          } else {
            return a.name.localeCompare(b.name); // Alphabetische Sortierung nach Dateinamen
          }
        });
      },
      error => console.error('Error fetching files:', error)
    );
  }

  getFileAttributes(fileName: string): void {
    this.fileService.getFileAttributes(fileName).subscribe(
      attributes => {
        // Find the file in the files array
        const file = this.files.find(f => f.name === fileName);
        if (file) {
          // Add attributes to the file object
          file.size = attributes.size;
          file.created = attributes.created;
          file.modified = attributes.modified;
          file.type = attributes.type;
        }
      },
      error => console.error(`Error fetching attributes for file ${fileName}:`, error)
    );
  }

  handleFolderClick(folderName: string): void {
    const newPath = this.currentPath ? `${this.currentPath}/${folderName}` : folderName;
    this.currentPath=newPath + '/' ;
    this.getFiles(`/${newPath}`);
    this.currentFolder = folderName;
  }

  downloadFile = (filePath: string) => {
    const encodedFilePath = encodeURIComponent(filePath).replace(/%2F/g, '/');
    window.open(`http://localhost:8080/download/${encodedFilePath}`);
  };


  refreshPage(): void {
    window.location.reload(); // Aktualisiere die Seite
  }

  deleteFile(fileName: string): void {
    const filePath = this.currentPath ? `${this.currentPath}/${fileName}` : fileName;
    const encodedFilePath = encodeURIComponent(filePath).replace(/%2F/g, '/');
    this.fileService.deleteFile(encodedFilePath).subscribe(
      response => {
        console.log(response);
        // Entferne die Datei aus der Liste der Dateien
        this.files = this.files.filter(file => file.name !== fileName);
      },
      error => console.error(`Error deleting file ${fileName}:`, error)
    );
  }
  
  

}
