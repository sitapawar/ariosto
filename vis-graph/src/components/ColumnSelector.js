import React from 'react';

const ColumnSelector = ({ columns, onColumnSelected }) => {
  const [id, setNodeColumn] = React.useState('');
  const [title, setTitleColumn] = React.useState('');
  const [label, setLabelColumn] = React.useState('');
  const [group, setGroupColumn] = React.useState('');
  const [to, setRelationshipColumn] = React.useState('');
  const [from, setFromColumn] = React.useState('');
  const [relationshipLabel, setRelationshipLabelColumn] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onColumnSelected({ id, title, label, group, to, from, relationshipLabel });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select ID Column:
        <select value={id} onChange={(e) => setNodeColumn(e.target.value)}>
          <option value="">--Select--</option>
          {columns.map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select Title Column:
        <select value={title} onChange={(e) => setTitleColumn(e.target.value)}>
          <option value="">--Select--</option>
          {columns.map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select Label Column:
        <select value={label} onChange={(e) => setLabelColumn(e.target.value)}>
          <option value="">--Select--</option>
          {columns.map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select Group Column:
        <select value={group} onChange={(e) => setGroupColumn(e.target.value)}>
          <option value="">--Select--</option>
          {columns.map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select To Column:
        <select value={to} onChange={(e) => setRelationshipColumn(e.target.value)}>
          <option value="">--Select--</option>
          {columns.map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select From Column:
        <select value={from} onChange={(e) => setFromColumn(e.target.value)}>
          <option value="">--Select--</option>
          {columns.map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select Relationship Label Column:
        <select value={relationshipLabel} onChange={(e) => setRelationshipLabelColumn(e.target.value)}>
          <option value="">--Select--</option>
          {columns.map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ColumnSelector;
