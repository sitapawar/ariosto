import React, { useState, useEffect } from 'react';
import '../style/navbar.css';
import logo from '../assets/spiderweb_logo.png';

const Navbar = ({onUploadClick, onResetClick, showTableView, toggleTableView, fileUploaded, setFilteredData}) => {
  const [groupNames, setGroupNames] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    if (fileUploaded) {
      fetch("https://spiderweb-j1ca.onrender.com/group_names")
        .then(res => res.json())
        .then(data => {
          setGroupNames(data.groupNames);
        })
        .catch(error => console.error('Error fetching group names:', error));
    } else {
      setGroupNames([]);
    }
  }, [fileUploaded]);

  const handleFilterClick = (groupName, filter) => {
    fetch("https://spiderweb-j1ca.onrender.com/filtered_data", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupName, filter })
    })
      .then(res => res.json())
      .then(data => {
        // Assuming you want to set both sheets in the state
        setFilteredData(data);
      })
      .catch(error => console.error('Error fetching filtered data:', error));
  };
  
  const handleResetClick =()=>{
    setFilteredData(null)
  }

  const handleGroupClick = (groupName) => {
    setSelectedGroup(groupName);
    fetch("https://spiderweb-j1ca.onrender.com/filters", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupName })
    })
      .then(res => res.json())
      .then(data => {
        setFilters(data.filters);
      })
      .catch(error => console.error('Error fetching filters:', error));
  };

  return (
    <nav className="navbar">
      <div className="title-logo">
        <img className="header-logo" src={logo} alt="Logo" />
        <div className="navbar-title">Spiderweb</div>
      </div>
      <div className="navbar-buttons">
        <div className="navbar-button dropdown">
          Filter
          <div className="dropdown-content">
            {fileUploaded ? (
              groupNames.length > 0 ? (
                groupNames.map((columnName, index) => (
                  <div key={index} className="dropdown-item">
                    <a className="groups"href="#" onClick={() => handleGroupClick(columnName)}>
                      {columnName}
                    </a>
                    {selectedGroup === columnName && (
                      <div className="dropdown-submenu">
                        {filters.length > 0 ? (
                          filters.map((filter, index) => (
                            <a href="#" key={index} onClick={() => handleFilterClick(columnName, filter)}
                            >{filter}</a>
                          ))
                        ) : (
                          <a href="#">Filter not Found</a>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <a href="#">Filter not Found</a>
              )
            ) : (
              <a href="#">No file uploaded</a>
            )}
          </div>
        </div>
        <button className="navbar-button" onClick={handleResetClick}>Reset</button>
        <button className="navbar-button" onClick={onUploadClick}>Upload</button>
        <button className="navbar-button" onClick={toggleTableView}>
          {showTableView ? 'Hide Table View' : 'Show Table View'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
