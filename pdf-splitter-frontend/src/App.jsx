import React, { useState } from 'react';
import './App.css';

function App() {
  // State to hold the selected PDF file object.
  const [selectedFile, setSelectedFile] = useState(null);
  // State to track if the file is currently being processed on the server.
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Handles the file input change event.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event.
   */
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  /**
   * Handles the form submission.
   * It sends the selected PDF file to the backend and triggers a download of the resulting ZIP file.
   */
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file first.');
      return;
    }

    setIsProcessing(true); // Set processing state to true to show a loading message.
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      // Send the file to the backend API.
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // If the server response is not OK, extract the error message and throw an error.
        const errorText = await response.text();
        throw new Error(errorText || 'Something went wrong on the server');
      }

      // Convert the response into a 'blob', which is a file-like object.
      const blob = await response.blob();

      // Create a temporary URL for the received blob.
      const url = window.URL.createObjectURL(blob);

      // Create an invisible anchor (<a>) element to trigger the download.
      const link = document.createElement('a');
      link.href = url;
      // Set the download attribute with a new filename for the zip file.
      link.setAttribute('download', `${selectedFile.name.replace('.pdf', '')}_split.zip`);

      // Append, "click", and then remove the link from the DOM.
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // Clean up by revoking the temporary object URL.
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error al enviar o procesar el archivo:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false); // Reset processing state regardless of success or failure.
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PDF Splitter 📄</h1>

        {/* Conditionally render a loading message or the file input and button */}
        {isProcessing ? (
          <p>Processing your file, please wait...</p>
        ) : (
          <>
            <p>Select a PDF file to get started</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
            <button onClick={handleSubmit} style={{ marginTop: '20px' }}>
              Split and Download
            </button>
          </>
        )}

      </header>
    </div>
  );
}

export default App;