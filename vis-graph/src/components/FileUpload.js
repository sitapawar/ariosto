import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../style/fileUpload.css';

const FileUpload = ({ onFileProcessed }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : 'No file chosen');
  };

  const handleFileUpload = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      fetch('https://spiderweb-j1ca.onrender.com/recieve_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sheet1: XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 }),
          sheet2: XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]], { header: 1 })
        }),
      })
        .then(response => response.json())
        .then(serverData => {
          console.log(serverData);
          onFileProcessed(serverData);
        })
        .catch(error => console.error('Error:', error));
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="file-upload-container">
      <div className="file-input-wrapper">
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
        />
        <button className="custom-file-button">
          Choose File
        </button>
        <p>{fileName}</p>
      </div>
      <button onClick={handleFileUpload} className="upload-button">
        Upload
      </button>
    </div>
  );
};

export default FileUpload;