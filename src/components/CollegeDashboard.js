import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CollegeDashboard = ({ college }) => {
  const [logoUrl, setLogoUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (college) {
      const domain = college.domains[0];
      axios.get(`https://logo.clearbit.com/${domain}`)
        .then(response => {
          setLogoUrl(`https://logo.clearbit.com/${domain}`);
          setError(false);
        })
        .catch(err => {
          console.error('Error fetching logo:', err);
          setError(true);
        });
    }
  }, [college]);

  if (!college) {
    return <div>Please select a college.</div>;
  }

  return (
    <div>
      <h2>{college.name}</h2>
      {error ? (
        <p>Logo not available</p>
      ) : (
        <img src={logoUrl} alt={`${college.name} logo`} style={{ width: '150px', height: 'auto' }} />
      )}
    </div>
  );
};

export default CollegeDashboard;
