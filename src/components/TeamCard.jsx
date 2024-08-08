// src/components/TeamCard.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 200px;
  text-align: center;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TeamCard = ({ team }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/team/${team.team.id}`);
    };

    return (
        <Card onClick={handleClick}>
            <img src={team.team.logo} alt={team.team.name} width="50" height="50" />
            <h3>{team.team.name}</h3>
            <p>{team.venue.name}</p>
        </Card>
    );
};

export default TeamCard;
