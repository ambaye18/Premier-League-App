import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchTeamPlayers } from '../api';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`;

const SeasonLink = styled.div`
  color: #007bff;
  cursor: pointer;
  margin: 5px 0;
  &:hover {
    text-decoration: underline;
  }
`;

const PlayerCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
`;

const PlayerDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TeamRostersCard = ({ teamId }) => {
    const [roster, setRoster] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);

    const fetchRosters = async (season) => {
        if (!teamId) return;

        try {
            const players = await fetchTeamPlayers(teamId, season);
            setRoster(players);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const seasonYears = [];
        for (let i = currentYear; i >= currentYear - 5; i--) {
            seasonYears.push(`${i}-${(i + 1).toString().slice(-2)}`);
        }
        setSeasons(seasonYears);
    }, []);

    const handleSeasonClick = (season) => {
        setSelectedSeason(season);
        setLoading(true);
        fetchRosters(season);
    };

    return (
        <Card>
            <h2>Rosters</h2>
            {seasons.map((season) => (
                <SeasonLink key={season} onClick={() => handleSeasonClick(season)}>
                    {season}
                </SeasonLink>
            ))}
            {loading && selectedSeason && <div>Loading roster for {selectedSeason}...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && selectedSeason && (
                <>
                    <h3>Season {selectedSeason}</h3>
                    {roster.length > 0 ? (
                        roster.map((player) => (
                            <PlayerCard key={player.player.id}>
                                <PlayerDetails>
                                    <div>
                                        <span>{player.player.name}</span>
                                    </div>
                                    <div>
                                        <span>{player.statistics[0].team.name}</span>
                                    </div>
                                    <div>
                                        <span>Appearances: {player.statistics[0].games.appearances}</span>
                                    </div>
                                </PlayerDetails>
                            </PlayerCard>
                        ))
                    ) : (
                        <div>No data available for this season.</div>
                    )}
                </>
            )}
        </Card>
    );
};

export default TeamRostersCard;
