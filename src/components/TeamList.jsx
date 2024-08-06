import React, { useEffect, useState } from 'react'; // Import React and hooks
import styled from 'styled-components'; // Import styled-components for styling
import Link from 'next/link'; // Import Link from Next.js for navigation
import { fetchTeams } from '../../src/api'; // Import API function

// Styled component for the team container
const TeamContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

// Styled component for card layout
const Card = styled.div`
border: 1px solid #ccc;
margin: 10px;
width: 200px;
text-align: center;
cursor: pointer;
`;

// Styled component for card title
const CardTitle = styled.h3`
margin: 0;
padding: 1rem;
`;

// Styled component for the header
const Header = styled.div`
background-color: #2c3e50;
padding: 20px;
color: white;
font-size: 24px;
text-align: center;
`;

// Styled component for typewriter effect
const Wrapper = styled.div`
display: inline-block;
white-space: nowrap;
overflow: hidden;
border-right: 2px solid;
animation: blink 0.75s step-end infinite;
font-size: 32px;

@keyframes blink {
    from, to { border-color: transparent }
    50% { border-color: white }
}
`;

// Typewriter component to display text with typewriter effect
const Typewriter = ({ text, speed = 150 }) => {
    const [displayedText, setDisplayedText] = useState(''); // State for displayed text

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.substring(0, index + 1)); // Update displayed text
            index++;
            if (index === text.length) {
                clearInterval(interval); // Clear interval when text is fully displayed
            }
        }, speed);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [text, speed]);

    return <Wrapper>{displayedText}</Wrapper>; // Render the typewriter effect
};

// Main component to display list of teams
export default function TeamList({ teams }) {
    const [loadedTeams, setLoadedTeams] = useState([]); // State for loaded teams

    useEffect(() => {
        async function loadTeams() {
            const fetchedTeams = await fetchTeams(); // Fetch teams from API
            fetchedTeams.sort((a, b) => a.name.localeCompare(b.name)); // Sort teams alphabetically by name
            setLoadedTeams(fetchedTeams); // Update state with fetched teams
        }
        loadTeams(); // Load teams on component mount
    }, []);

    return (
        <div>
            <Header>
                <Typewriter text="Premier League Teams" /> {/* Typewriter effect for header */}
            </Header>
            <TeamContainer>
                {loadedTeams.map((team, index) => (
                    <Link key={index} href={`/team/${team.id}`} passHref> {/* Link to team details */}
                        <Card>
                            <CardTitle>{team.name}</CardTitle> {/* Display team name */}
                        </Card>
                    </Link>
                ))}
            </TeamContainer>
        </div>
    );
}
