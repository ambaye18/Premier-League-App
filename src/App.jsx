// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamList from './components/TeamList';
import TeamDetails from './components/TeamDetails';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TeamList />} />
                <Route path="/team/:id" element={<TeamDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
