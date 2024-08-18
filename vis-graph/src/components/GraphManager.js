import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import TestGraph from './graphTest';
import TableView from './TableView'; 
import '../style/graphManager.css';
import excelFile from '../assets/CharacterFile2.numbers'; // Excel file in the assets folder

const GraphManager = ({ fileUploaded, setFileUploaded, showTableView, filteredData }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [allNodes, setAllNodes] = useState([]);
  const [allFilteredNodes, setAllFilteredNodes] = useState([]);
  const [processedNodes, setProcessedNodes] = useState([]);
  const [processedEdges, setProcessedEdges] = useState([]);
  const [viewType, setViewType] = useState('nodes');

  useEffect(() => {
    // Simulate reading and processing the hardcoded Excel file
    handleExcelProcessing();
  }, []);

  const handleExcelProcessing = async () => {
    try {
      const response = await fetch(excelFile);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      const sheet1 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
      const sheet2 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]], { header: 1 });

      const data = {
        sheet1,
        sheet2
      };

      // Send the JSON data to the API
      fetch('https://spiderweb-j1ca.onrender.com/recieve_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(serverData => {
        console.log("recieved data");
        onFileProcessed(serverData);
      })
      .catch(error => console.error('Error:', error));
    } catch (error) {
      console.error("Error processing Excel file:", error);
    }
  };

  const onFileProcessed = (serverData) => {
    try {
      const nodesData = JSON.parse(serverData.sheet1);
      const edgesData = JSON.parse(serverData.sheet2);

      const Pnodes = nodesData.map(item => ({
        id: item.ID,
        label: item.Name,
        title: item.Label,
        group: item.group1
      }));

      const Pedges = edgesData.map(item => ({
        from: item.from,
        to: item.to,
        label: item.label,
        arrows: item.arrows || "to",
      }));

      setNodes(Pnodes);
      setLinks(Pedges);
      setProcessedNodes(Pnodes);
      setProcessedEdges(Pedges);
      setAllNodes(nodesData);

      setFileUploaded(true);
    } catch (error) {
      console.error("Error processing server data:", error);
    }
  };

  useEffect(() => {
    if (filteredData) {
      const nodesData = JSON.parse(filteredData.sheet1);
      const edgesData = JSON.parse(filteredData.sheet2);

      const filteredNodes = nodesData.map(item => ({
        id: item.ID,
        label: item.Name,
        title: item.Label,
        group: item.group1
      }));
      const filteredEdges = edgesData.map(item => ({
        from: item.from,
        to: item.to,
        label: item.label,
        arrows: item.arrows || "to",
      }));

      setNodes(filteredNodes);
      setLinks(filteredEdges);
      setAllFilteredNodes(nodesData);
    } else {
      setNodes(processedNodes);
      setLinks(processedEdges);
    }
  }, [filteredData]);

  return (
    <div className="CenteredContent">
      {fileUploaded && (
        <div className="graph-container">
          {!filteredData && <TestGraph nodes={processedNodes} edges={processedEdges} />}
          {filteredData && <TestGraph nodes={nodes} edges={links} />}
          {showTableView && !filteredData && (
            <div className="table-view-overlay">
              <TableView 
                nodes={allNodes} 
                edges={processedEdges} 
                viewType={viewType}
                setViewType={setViewType}
              />
            </div>
          )}
          {showTableView && filteredData && (
            <div className="table-view-overlay">
              <TableView 
                nodes={allFilteredNodes} 
                edges={links} 
                viewType={viewType}
                setViewType={setViewType}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GraphManager;
