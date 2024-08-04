import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { fetchTeams } from '../../src/api'; // Ensure this path is correct

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
`;

const MainContent = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  padding: 20px;
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  background-color: #343a40;
  padding: 20px 0;
  text-align: center;
  color: white;
  margin: 0; // Ensure no margin is applied
`;

const Header = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: 28px;
`;

const Wrapper = styled.div`
  display: inline-block;
  font-size: 28px;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid;
  animation: blink 0.75s step-end infinite;

  @keyframes blink {
    from, to { border-color: transparent }
    50% { border-color: white }
  }
`;

const Typewriter = ({ text, speed = 30 }) => {
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

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 10px;
  width: 220px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  padding: 1rem;
  font-size: 20px;
  color: #007bff;
  text-decoration: none;
`;

const Footer = styled.footer`
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
`;

const CreditLink = styled.a`
  color: #007bff;
  text-decoration: none;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export default function TeamList() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        async function loadTeams() {
            const fetchedTeams = await fetchTeams();
            const sortedTeams = fetchedTeams.sort((a, b) => a.name.localeCompare(b.name));
            setTeams(sortedTeams);
        }
        loadTeams();
    }, []);

    return (
        <Container>
            <HeaderContainer>
                <Header>
                    <Typewriter text="Premier League Teams" />
                </Header>
            </HeaderContainer>
            <MainContent>
                <TeamContainer>
                    {teams.map((team, index) => (
                        <Link key={index} href={`/team/${team.id}`} passHref>
                            <Card>
                                <CardTitle>{team.name}</CardTitle>
                            </Card>
                        </Link>
                    ))}
                </TeamContainer>
            </MainContent>
            <Footer>
                &copy; 2024 Alden George and Al Mbaye.
                <CreditLink href="/credits">Credits</CreditLink>
            </Footer>
        </Container>
    );
}
