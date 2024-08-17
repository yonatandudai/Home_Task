import React from 'react';

function MetadataDisplay({ metadata }) {
  return (
    <div className="metadata-display">
      {metadata.map((data, index) => (
        <div key={index} className="metadata-item">
          {data.error ? (
            <div className="error">Error fetching metadata for: {data.url}</div>
          ) : (
            <>
              <h3>{data.title}</h3>
              <p>{data.description}</p>
              {data.image && <img src={data.image} alt={data.title} />}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MetadataDisplay;
