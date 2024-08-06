import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchUpcomingMatches } from '../api';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`;

const Fixture = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const TeamLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const MatchInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.div`
  font-size: 0.9rem;
  color: #555;
`;

const formatDate = (dateString) => {
    const date = new window.Date(dateString);  // Explicitly use window.Date to avoid conflicts
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

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
                    <MatchInfo>
                        <TeamLogo src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
                        <span>{fixture.teams.home.name}</span>
                    </MatchInfo>
                    <span>vs</span>
                    <MatchInfo>
                        <TeamLogo src={fixture.teams.away.logo} alt={fixture.teams.away.name} />
                        <span>{fixture.teams.away.name}</span>
                    </MatchInfo>
                    <Date>{formatDate(fixture.fixture.date)}</Date>
                </Fixture>
            ))}
        </Card>
    );
};

export default UpcomingMatchesCard;
