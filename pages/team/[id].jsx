import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { fetchTeams } from '../../src/api'; // Ensure this path is correct

const Card = styled.div`
  border: 1px solid #ccc;
  margin: 10px;
  padding: 15px;
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 10px;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default function TeamDetails({ team }) {
    const router = useRouter();

    if (!team) return <div>Loading...</div>;

    return (
        <Card>
            {team.logo && <Logo src={team.logo} alt={`${team.name} logo`} />}
            <h2>{team.name}</h2>
            <p>{`Founded: ${team.founded}`}</p>
            <p>{`Country: ${team.country}`}</p>
            <p>{`Venue: ${team.venue.name}`}</p>
            <p>{`Capacity: ${team.venue.capacity}`}</p>
            <BackButton onClick={() => router.back()}>Back</BackButton>
        </Card>
    );
}

export async function getStaticPaths() {
    const teams = await fetchTeams();
    const paths = teams.map(team => ({
        params: { id: team.id.toString() },
    }));

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const teams = await fetchTeams();
    const team = teams.find(team => team.id.toString() === params.id);

    return { props: { team } };
}
