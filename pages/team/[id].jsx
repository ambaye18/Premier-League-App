import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { fetchTeams } from '../../src/api';

const Card = styled.div`
  border: 1px solid #ccc;
  margin: 10px;
  padding: 15px;
  width: 300px;
  text-align: center;
`;

export default function TeamDetails({ team }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <h2>{team.name}</h2>
            <p>{`Founded: ${team.founded}`}</p>
            <p>{`Venue: ${team.venue}`}</p>
        </Card>
    );
}

export async function getStaticPaths() {
    const teams = await fetchTeams();
    const paths = teams.map(team => ({
        params: { id: team.team.id.toString() },
    }));

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const teams = await fetchTeams();
    const team = teams.find(team => team.team.id.toString() === params.id);

    return {
        props: {
            team: team ? team.team : null,
        },
    };
}
