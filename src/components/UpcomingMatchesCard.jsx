import React, { useEffect, useState } from 'react'; // Import React and hooks
import styled from 'styled-components'; // Import styled-components for styling
import { fetchUpcomingMatches } from '../api'; // Import API function to fetch upcoming matches

// Styled component for the card layout
const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`;

// Styled component for fixture layout
const Fixture = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

// Styled component for team logo
const TeamLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

// Styled component for match information
const MatchInfo = styled.div`
  display: flex;
  align-items: center;
`;

// Styled component for date display
const Date = styled.div`
  font-size: 0.9rem;
  color: #555;
`;

// Function to format date strings
const formatDate = (dateString) => {
    const date = new window.Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options); // Format and return the date
};

// Component to display upcoming matches for a team
const UpcomingMatchesCard = ({ teamId }) => {
    const [fixtures, setFixtures] = useState([]); // State for fixtures data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    // useEffect to fetch upcoming matches
    useEffect(() => {
        if (!teamId) return;

        const fetchFixtures = async () => {
            try {
                const matches = await fetchUpcomingMatches(teamId); // Fetch upcoming matches
                setFixtures(matches); // Update fixtures state
                setLoading(false); // Update loading state
            } catch (err) {
                setError(err.message); // Update error state
                setLoading(false); // Update loading state
            }
        };

        fetchFixtures(); // Call the fetch function
    }, [teamId]);

    if (loading) return <div>Loading upcoming matches...</div>; // Display loading message
    if (error) return <div>Error: {error}</div>; // Display error message

    return (
        <Card>
            {fixtures.map((fixture) => (
                <Fixture key={fixture.fixture.id}>
                    <MatchInfo>
                        <TeamLogo src={fixture.teams.home.logo} alt={fixture.teams.home.name} /> {/* Display home team logo */}
                        <span>{fixture.teams.home.name}</span> {/* Display home team name */}
                    </MatchInfo>
                    <span>vs</span>
                    <MatchInfo>
                        <TeamLogo src={fixture.teams.away.logo} alt={fixture.teams.away.name} /> {/* Display away team logo */}
                        <span>{fixture.teams.away.name}</span> {/* Display away team name */}
                    </MatchInfo>
                    <Date>{formatDate(fixture.fixture.date)}</Date> {/* Display match date */}
                </Fixture>
            ))}
        </Card>
    );
};

export default UpcomingMatchesCard; // Export the UpcomingMatchesCard component as default export
