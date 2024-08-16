import React, { useState } from 'react';
import '../style/tableView.css'; // Ensure to create this CSS file for styling

const TableView = ({ nodes, edges }) => {
  const [viewType, setViewType] = useState('nodes'); // State to toggle between nodes and edges

  const handleToggleView = () => {
    setViewType(viewType === 'nodes' ? 'edges' : 'nodes');
  };

  return (
    <div className="TableView">
      <h2>{viewType === 'nodes' ? 'Character List' : 'Relationship List'}</h2>
      <button onClick={handleToggleView}>
        {viewType === 'nodes' ? 'Show Edges' : 'Show Nodes'}
      </button>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {viewType === 'nodes' ? (
                <>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Group</th>
                  <th>Description</th>
                </>
              ) : (
                <>
                  <th>From</th>
                  <th>To</th>
                  <th>Label</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {viewType === 'nodes' ? (
              nodes.map(node => (
                <tr key={node.id}>
                  <td>{node.ID}</td>
                  <td>{node.Name}</td>
                  <td>{node.group}</td>
                  <td>{node.Label}</td>
                </tr>
              ))
            ) : (
              edges.map((edge, index) => (
                <tr key={index}>
                  <td>{edge.from}</td>
                  <td>{edge.to}</td>
                  <td>{edge.label}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;
