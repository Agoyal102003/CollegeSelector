import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const CollegeSelector = ({ onCollegeSelect }) => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedCollege, setSelectedCollege] = useState(null);

    useEffect(() => {
        if (inputValue) {
            setLoading(true);
            axios.get(`https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json`)
                .then(response => {
                    const filteredColleges = response.data.filter(college =>
                        college.name.toLowerCase().includes(inputValue.toLowerCase())
                    );
                    setColleges(filteredColleges);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching colleges:', error);
                    setLoading(false);
                });
        }
    }, [inputValue]);

    const handleSelect = (event, newValue) => {
        setSelectedCollege(newValue);
        onCollegeSelect(newValue);
    };

    return (
        <div>
            <Autocomplete
                options={colleges}
                getOptionLabel={(option) => option.name}
                loading={loading}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={handleSelect}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select a College"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
            {selectedCollege && (
                <div>
                    <h2>Selected College:</h2>
                    <p>{selectedCollege.name}</p>
                </div>
            )}
        </div>
    );
};

export default CollegeSelector;
