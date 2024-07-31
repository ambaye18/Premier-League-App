import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ccc;
  margin: 10px;
  padding: 15px;
  width: 300px;
  text-align: center;
`;

export default function TeamDetails({ team }) {
    if (!team) return <div>Loading...</div>;

    return (
        <Card>
            <h2>{team.name}</h2>
            <p>{`Founded: ${team.founded}`}</p>
            <p>{`Venue: ${team.venue}`}</p>
        </Card>
    );
}
