import React, { useState } from 'react';
import URLForm from './components/URLForm';
import MetadataDisplay from './components/MetadataDisplay';

function App() {
  const [metadata, setMetadata] = useState([]);

  const fetchMetadata = async (urls) => {
    const promises = urls.map(async (url) => {
      try {
        const response = await fetch(`https://api.url-metadata-fetcher.com/?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error('Error fetching metadata');
        const data = await response.json();
        return {
          url,
          title: data.title || 'No title available',
          description: data.description || 'No description available',
          image: data.image || '',
        };
      } catch (error) {
        return { url, error: true };
      }
    });

    const results = await Promise.all(promises);
    setMetadata(results);
  };

  return (
    <div className="App">
      <URLForm onSubmit={fetchMetadata} />
      <MetadataDisplay metadata={metadata} />
    </div>
  );
}

export default App;
