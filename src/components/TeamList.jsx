import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
`;

const Card = styled.div`
  border: 1px solid #ccc;
  margin: 10px;
  width: 200px;
  text-align: center;
  cursor: pointer;
`;

const CardTitle = styled.h3`
  margin: 0;
  padding: 1rem;
`;

export default function TeamList({ teams }) {
    return (
        <TeamContainer>
            {teams.map((team, index) => (
                <Link key={index} href={`/team/${team.team.id}`} passHref>
                    <Card>
                        <CardTitle>{team.team.name}</CardTitle>
                    </Card>
                </Link>
            ))}
        </TeamContainer>
    );
}
