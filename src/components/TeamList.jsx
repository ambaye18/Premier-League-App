import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { fetchTeams } from '../../src/api'; // Ensure this path is correct

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

const Header = styled.div`
  background-color: #2c3e50;
  padding: 20px;
  color: white;
  font-size: 24px;
  text-align: center;
`;

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

const Typewriter = ({ text, speed = 150 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.substring(0, index + 1));
            index++;
            if (index === text.length) {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <Wrapper>{displayedText}</Wrapper>;
};

export default function TeamList({ teams }) {
    const [loadedTeams, setLoadedTeams] = useState([]);

    useEffect(() => {
        async function loadTeams() {
            const fetchedTeams = await fetchTeams();
            fetchedTeams.sort((a, b) => a.name.localeCompare(b.name)); // Sort teams alphabetically by name
            setLoadedTeams(fetchedTeams);
        }
        loadTeams();
    }, []);

    return (
        <div>
            <Header>
                <Typewriter text="Premier League Teams" />
            </Header>
            <TeamContainer>
                {loadedTeams.map((team, index) => (
                    <Link key={index} href={`/team/${team.id}`} passHref>
                        <Card>
                            <CardTitle>{team.name}</CardTitle>
                        </Card>
                    </Link>
                ))}
            </TeamContainer>
        </div>
    );
}
