import React, { useState } from 'react';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DoneIcon from '@mui/icons-material/Done';

const CalendarViewer = () => {
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setFileUploaded(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px', textAlign: 'center' }}>
      <h1>Calendrier Universitaire</h1>
      <label htmlFor="upload-file">
        <input
          id="upload-file"
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          endIcon={fileUploaded ? <DoneIcon sx={{ color: 'green' }} /> : null}
          sx={{ borderColor: fileUploaded ? 'green' : undefined, marginBottom: 2 }}
        >
          {fileUploaded ? 'Uploaded' : 'Upload'}
        </Button>
      </label>
      {file && (
        <PDFViewer style={{ width: '100%', height: '80vh' }}>
          <Document file={file}>
            <Page pageNumber={1} />
          </Document>
        </PDFViewer>
      )}
    </Box>
  );
};

export default CalendarViewer;
