// src/components/UpcomingMatchesCard.jsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchUpcomingMatches } from '../api'; // Ensure this path is correct

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`;

const Fixture = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const UpcomingMatchesCard = ({ teamId }) => {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!teamId) return;

        const fetchFixtures = async () => {
            try {
                const matches = await fetchUpcomingMatches(teamId);
                setFixtures(matches);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFixtures();
    }, [teamId]);

    if (loading) return <div>Loading upcoming matches...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Card>
            {fixtures.map((fixture) => (
                <Fixture key={fixture.fixture.id}>
                    <div>
                        <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} width="50" />
                        <span>{fixture.teams.home.name}</span>
                    </div>
                    <div>
                        <span>vs</span>
                    </div>
                    <div>
                        <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} width="50" />
                        <span>{fixture.teams.away.name}</span>
                    </div>
                    <div>
                        <span>{new Date(fixture.fixture.date).toLocaleDateString()}</span>
                    </div>
                </Fixture>
            ))}
        </Card>
    );
};

export default UpcomingMatchesCard;
