import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { fetchTeams } from '../../src/api';


// Styled component for the team container
const TeamContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
`;

// Styled component for card layout
const Card = styled.div`
    border: 1px solid #ccc;
    margin: 10px;
    width: 200px;
    text-align: center;
    cursor: pointer;
    background-color: #38003c;
    transition: transform 0.2s; // Smooth transform effect on hover

    &:hover {
        transform: scale(1.05); // Slight scale up on hover
    }
`;

// Styled component for team logo
const TeamLogo = styled.img`
    width: 100%;
    height: auto;
    margin-top: 10px;
`;

// Styled component for card title
const CardTitle = styled.h3`
    margin: 0;
    padding: 1rem;
    color: white; 
    font-family: 'Arial', sans-serif;
`;

// Styled component for the header
const Header = styled.div`
    background-color: #38003c; // Premier League purple background
    padding: 20px;
    color: white;
    font-size: 50px;
    text-align: center;
    font-family: 'Arial', sans-serif;
    margin-top: 0;
    width: 100%;
    position: fixed; 
    top: 0;
    left: 0;
`;

// Main component to display list of teams
export default function TeamList() {
    const [loadedTeams, setLoadedTeams] = useState([]);

    useEffect(() => {
        async function loadTeams() {
            const fetchedTeams = await fetchTeams();
            fetchedTeams.sort((a, b) => a.name.localeCompare(b.name));
            setLoadedTeams(fetchedTeams);
        }
        loadTeams();
    }, []);

    return (
        <div>
            <Header>English Premier League Clubs 2023/24</Header>
            <TeamContainer>
                {loadedTeams.map((team, index) => (
                    <Link key={index} href={`/team/${team.id}`} passHref>
                        <Card>
                            <TeamLogo src={team.logo} alt={`${team.name} Logo`} />
                            <CardTitle>{team.name}</CardTitle>
                        </Card>
                    </Link>
                ))}
            </TeamContainer>
        </div>
    );
}
