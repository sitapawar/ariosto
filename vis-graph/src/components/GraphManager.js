import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import TestGraph from './graphTest';
import TableView from './TableView'; 
import '../style/graphManager.css';

const GraphManager = ({ fileUploaded, setFileUploaded, showTableView, filteredData }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [allNodes, setAllNodes] = useState([]);
  const [allFilteredNodes, setAllFilteredNodes] = useState([]);
  const [processedNodes, setprocessedNodes] = useState([]);
  const [processedEdges, setprocessedEdges] = useState([]);
  const [viewType, setViewType] = useState('nodes'); // State to toggle between nodes and edges

  useEffect(() => {
    if (filteredData) {
      const nodesData = JSON.parse(filteredData.sheet1);
      const edgesData = JSON.parse(filteredData.sheet2);
      const filteredNodes = nodesData.map(item => ({
        id: item.ID,
        label: item.Name,
        title: `Description: ${item.Label} Group: ${item.group1}`,
        group: item.group1
      }));
      const filteredEdges = edgesData.map(item => ({
        from: item.from,
        to: item.to,
        label: item.label,
        arrows: item.arrows,
      }));
      console.log(filteredNodes)
      console.log(filteredEdges)
      setNodes(filteredNodes);
      setLinks(filteredEdges);
      setAllFilteredNodes(nodesData)
      // handleFileProcessed(filteredData);
    }else{
      console.log("reset")
      console.log(processedNodes)
      console.log(processedEdges)
      setNodes([])
      setLinks([])
      setNodes(processedNodes)      
      setLinks(processedEdges)
    }
    // console.log('Nodes:', nodes);
    // console.log('Links:', links);
    // console.log('All Nodes:', allNodes);
  }, [filteredData]);

  const handleFileProcessed = (serverData) => {
    try {
      // Parse JSON strings from serverData
      const nodesData = JSON.parse(serverData.sheet1);
      const edgesData = JSON.parse(serverData.sheet2);

      // Process nodesData
      const Pnodes = nodesData.map(item => ({
        id: item.ID,
        label: item.Name,
        title: `Description: ${item.Label} Group: ${item.group1}`,
        group: item.group1
      }));
  
      // Process edgesData
      const Pedges = edgesData.map(item => ({
        from: item.from,
        to: item.to,
        label: item.label,
        arrows: item.arrows,
      }));
  
      // Update the state with processed data
      setNodes(Pnodes);
      setLinks(Pedges);
      setprocessedEdges(Pedges);
      setprocessedNodes(Pnodes);
      setAllNodes(nodesData);
      // Set fileUploaded to true
      setFileUploaded(true);
    } catch (error) {
      console.error("Error processing file data:", error);
    }
  };

  return (
    <div className="CenteredContent">
      {!fileUploaded && filteredData==null && <FileUpload onFileProcessed={handleFileProcessed} />}
      {fileUploaded && (
        <div className="graph-container">
          {filteredData==null && <TestGraph nodes={processedNodes} edges={processedEdges} />}
          {filteredData!=null && <TestGraph nodes={nodes} edges={links} />}
          {showTableView && filteredData==null &&(
            <div className="table-view-overlay">
              <TableView 
                nodes={allNodes} 
                edges={processedEdges} 
                viewType={viewType}
                setViewType={setViewType} // Pass the viewType and setter to TableView
              />
            </div>
          )}
          {showTableView && filteredData!=null &&(
            <div className="table-view-overlay">
              <TableView 
                nodes={allFilteredNodes} 
                edges={links} 
                viewType={viewType}
                setViewType={setViewType} // Pass the viewType and setter to TableView
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GraphManager;
