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

const MainHeader = styled.header`
  background-color: #343a40;
  color: white;
  padding: 20px;
  text-align: center;
`;

const Header = styled.h1`
  margin: 20px 0;
`;

const Wrapper = styled.div`
  display: inline-block;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid;
  animation: blink 0.75s step-end infinite;

  @keyframes blink {
    from, to { border-color: transparent }
    50% { border-color: black }
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

export default function TeamList() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        async function loadTeams() {
            const fetchedTeams = await fetchTeams();
            setTeams(fetchedTeams);
        }
        loadTeams();
    }, []);

    console.log(teams); // Log the teams array to see what it contains

    return (
        <div>
            <MainHeader>
                <Typewriter text="Premier League Teams" />
            </MainHeader>
            <TeamContainer>
                {teams.map((team, index) => (
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
