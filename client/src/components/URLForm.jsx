import React, { useState } from 'react';


function URLForm({ onSubmit }) {
  const [urls, setUrls] = useState(['', '', '']);
  
  const handleInputChange = (index, event) => {
    const newUrls = [...urls];
    newUrls[index] = event.target.value;
    setUrls(newUrls);
  };
  
  const addInputField = () => {
    setUrls([...urls, '']);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(urls);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter URLs</h2>
      {urls.map((url, index) => (
        <div key={index}>
          <input
            type="url"
            value={url}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Enter a URL"
            required
          />
        </div>
      ))}
      <button type="button" onClick={addInputField}>Add another URL</button>
      <button type="submit">Submit</button>
    </form>
  );
}
export default URLForm;

