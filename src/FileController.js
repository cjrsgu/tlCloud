import fs from 'fs';
import path from 'path';

// data format
/*
  {
    path: '/'
    files: [file1, file2, file3, ...],
    folders: [
      {
        path: '/folder1',
        files: [file1, file2, file3, ...],
        folders: null,
      },
      {
        path: '/folder2',
        files: [file1, file2, file3, ...],
        folders: null,
      },
      ...
    ]
  }
*/

class FileController {
  constructor(folderPath) {
    this.path = folderPath;
  }

  setPath(folderPath) {
    this.path = folderPath;
  }
}

export default FileController;
