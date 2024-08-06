import React, { useEffect, useState } from 'react'; // Import React and hooks
import styled from 'styled-components'; // Import styled-components for styling
import { fetchTeamPlayers } from '../api'; // Import API function to fetch team players

// Styled component for the card layout
const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`;

// Styled component for the season link
const SeasonLink = styled.div`
  color: #007bff;
  cursor: pointer;
  margin: 5px 0;
  &:hover {
    text-decoration: underline;
  }
`;

// Styled component for the player card layout
const PlayerCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
`;

// Styled component for player details
const PlayerDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Component to display team rosters
const TeamRostersCard = ({ teamId }) => {
    const [roster, setRoster] = useState([]); // State for roster data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling
    const [seasons, setSeasons] = useState([]); // State for available seasons
    const [selectedSeason, setSelectedSeason] = useState(null); // State for selected season

    // Function to fetch rosters for a selected season
    const fetchRosters = async (season) => {
        if (!teamId) return;

        try {
            const players = await fetchTeamPlayers(teamId, season); // Fetch players data
            setRoster(players); // Update roster state
            setLoading(false); // Update loading state
        } catch (err) {
            setError(err.message); // Update error state
            setLoading(false); // Update loading state
        }
    };

    // useEffect to initialize seasons
    useEffect(() => {
        const currentYear = new Date().getFullYear(); // Get the current year
        const seasonYears = [];
        for (let i = currentYear; i >= currentYear - 5; i--) {
            seasonYears.push(`${i}-${(i + 1).toString().slice(-2)}`); // Generate season years
        }
        setSeasons(seasonYears); // Update seasons state
    }, []);

    // Handler for season click
    const handleSeasonClick = (season) => {
        setSelectedSeason(season); // Set selected season
        setLoading(true); // Set loading state
        fetchRosters(season); // Fetch rosters for the selected season
    };

    return (
        <Card>
            <h2>Rosters</h2> {/* Header for the rosters section */}
            {seasons.map((season) => (
                <SeasonLink key={season} onClick={() => handleSeasonClick(season)}>
                    {season} {/* Display each season as a link */}
                </SeasonLink>
            ))}
            {loading && selectedSeason && <div>Loading roster for {selectedSeason}...</div>} {/* Display loading message */}
            {error && <div>Error: {error}</div>} {/* Display error message */}
            {!loading && !error && selectedSeason && (
                <>
                    <h3>Season {selectedSeason}</h3> {/* Display selected season */}
                    {roster.length > 0 ? (
                        roster.map((player) => (
                            <PlayerCard key={player.player.id}>
                                <PlayerDetails>
                                    <div>
                                        <span>{player.player.name}</span> {/* Display player name */}
                                    </div>
                                    <div>
                                        <span>{player.statistics[0].team.name}</span> {/* Display team name */}
                                    </div>
                                    <div>
                                        <span>Appearances: {player.statistics[0].games.appearances}</span> {/* Display player appearances */}
                                    </div>
                                </PlayerDetails>
                            </PlayerCard>
                        ))
                    ) : (
                        <div>No data available for this season.</div> //* Display message if no data */
                        )}
                </>
            )}
        </Card>
    );
};

export default TeamRostersCard; // Export the TeamRostersCard component as default export
