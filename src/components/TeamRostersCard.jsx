// src/components/TeamRostersCard.jsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchTeamPlayers } from '../api'; // Ensure this path is correct

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`;

const RosterButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
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
    const [showRoster, setShowRoster] = useState(false);

    const fetchRosters = async () => {
        if (!teamId) return;

        try {
            const players = await fetchTeamPlayers(teamId);
            setRoster(players);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const toggleRoster = () => {
        setShowRoster(!showRoster);
        if (!showRoster) {
            fetchRosters();
        }
    };

    if (loading) return <div>Loading roster...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Card>
            <RosterButton onClick={toggleRoster}>
                {showRoster ? 'Hide Roster' : 'Show Roster'}
            </RosterButton>
            {showRoster && roster.map((player) => (
                <PlayerCard key={player.player.id}>
                    <PlayerDetails>
                        <div>
                            <img src={player.player.photo} alt={player.player.name} width="50" />
                            <span>{player.player.name}</span>
                        </div>
                        <div>
                            <span>{player.statistics[0].team.name}</span>
                        </div>
                        <div>
                            <span>Stats: {player.statistics[0].games.appearances} appearances</span>
                        </div>
                    </PlayerDetails>
                </PlayerCard>
            ))}
        </Card>
    );
};

export default TeamRostersCard;
