import React from 'react';
import GraphManager from './GraphManager';
import '../style/snake.css';

class Snake extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "Loading...", 
      error: null 
    };
  }

  callAPI() {
    fetch("https://spiderweb-j1ca.onrender.com/")
      .then(res => {
        console.log('Response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then(text => {
        console.log('API response:', text);
        this.setState({ apiResponse: text });
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        this.setState({ error: 'Error: ' + error.message });
      });
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    const { fileUploaded, setFileUploaded, showTableView, filteredData } = this.props; // Get props
    const { apiResponse, error } = this.state; // Destructure apiResponse and error from state

    return (
      <div className="Snake">
        <p>{error ? error : apiResponse}</p>
        <GraphManager
          fileUploaded={fileUploaded}
          setFileUploaded={setFileUploaded}
          showTableView={showTableView} // Pass showTableView to GraphManager
          filteredData={filteredData}
        />
      </div>
    );
  }
}

export default Snake;
