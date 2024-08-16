import React, { useState } from 'react';
import "./JackApp.css"
import FileUpload from './components/FileUpload';
import GraphComponent from './components/d3Graph';

function JackApp() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  const handleFileProcessed = (jsonData, columns, nodeColumn, relationshipColumn) => {
    // here its extracting data from jsonData based on selected columns by user
    const data = jsonData.slice(1);
    const nodes = data.map((row, index) => ({ id: row[columns.indexOf(nodeColumn)], ...row }));
    const links = data.map(row => ({
      source: row[columns.indexOf(nodeColumn)],
      target: row[columns.indexOf(relationshipColumn)]
    }));

    setNodes(nodes);
    setLinks(links);
  };
  //should be making the simple version of the App based on the graphing here
  return (
    <div className="JackApp">
      <h1>Excel to Graph Network</h1>
      <FileUpload onFileProcessed={handleFileProcessed} />
      <GraphComponent nodes={nodes} links={links} />
    </div>
  );
}

export default JackApp;
