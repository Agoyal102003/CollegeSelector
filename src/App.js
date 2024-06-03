import React, { useState } from 'react';
import CollegeSelector from './components/CollegeSelector';
import CollegeDashboard from './components/CollegeDashboard';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const App = () => {
  const [selectedCollege, setSelectedCollege] = useState(null);

  return (
    <Container>
      <Box my={4}>
        <CollegeSelector onCollegeSelect={setSelectedCollege} />
      </Box>
      <Box my={4}>
        <CollegeDashboard college={selectedCollege} />
      </Box>
    </Container>
  );
};

export default App;
