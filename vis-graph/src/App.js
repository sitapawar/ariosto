import './App.css';
import React, { useState } from 'react';
import Navbar from './components/navbar';
import GraphManager from './components/GraphManager';
import Snake from './components/snake';

function App() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [filteredData, setFilteredData] = useState(null); 
  const [showTableView, setShowTableView] = useState(false);


  const handleUploadClick = () => {
    console.log('uploading');
    setFileUploaded(false); // Set fileUploaded to false
    console.log(fileUploaded);
  };

  const handleResetClick = () => {
  };

  const toggleTableView = () => {
    setShowTableView(prevState => !prevState);
  };

  return (
    <div className="App">
      <Navbar
        onUploadClick={handleUploadClick}
        onResetClick={handleResetClick}
        showTableView={showTableView}
        toggleTableView={toggleTableView}
        fileUploaded={fileUploaded}
        setFilteredData={setFilteredData}
      />
      <div className="Main">
        <Snake
          fileUploaded={fileUploaded}
          setFileUploaded={setFileUploaded}
          showTableView={showTableView}
          filteredData={filteredData}
        />
      </div>
    </div>
  );
}

export default App;
