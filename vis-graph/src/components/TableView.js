import React, { useState } from 'react';
import '../style/tableView.css'; // Ensure to create this CSS file for styling

const TableView = ({ nodes}) => {
  return (
    <div className="TableView">
      <h2>{'Character List'}</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Group</th>
                  <th>Description</th>
            </tr>
          </thead>
          <tbody>
              {nodes.map(node => (
                <tr key={node.id}>
                  <td>{node.ID}</td>
                  <td>{node.Name}</td>
                  <td>{node.group1}</td>
                  <td>{node.Label}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;
