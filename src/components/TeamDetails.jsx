import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { fetchTeams, fetchTeamDetails } from '../../src/api'; // Ensure this path is correct
import UpcomingMatchesCard from '../../src/components/UpcomingMatchesCard';
import TeamRostersCard from '../../src/components/TeamRostersCard';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

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

const TeamDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamDetails = ({ team }) => {
    const router = useRouter();

    if (!team) return <div>Loading...</div>;

    return (
        <Container>
            <Card>
                {team.logo && <Logo src={team.logo} alt={`${team.name} logo`} />}
                <h2>{team.name}</h2>
                <p>{`Founded: ${team.founded}`}</p>
                <p>{`Country: ${team.country}`}</p>
                <p>{`Venue: ${team.venue.name}`}</p>
                <p>{`Capacity: ${team.venue.capacity}`}</p>
                <BackButton onClick={() => router.back()}>Back</BackButton>
            </Card>
            <Card>
                <h2>Upcoming Matches</h2>
                <UpcomingMatchesCard teamId={team.id} />
            </Card>
            <Card>
                <h2>Roster</h2>
                <TeamRostersCard teamId={team.id} />
            </Card>
        </Container>
    );
}

export async function getStaticPaths() {
    try {
        const teams = await fetchTeams();
        console.log('Teams:', teams); // Log the teams data to check structure
        const paths = teams.map(team => ({
            params: { id: team.id.toString() }, // Access the correct property
        }));
        return { paths, fallback: true };
    } catch (error) {
        console.error('Error in getStaticPaths:', error);
        return { paths: [], fallback: true };
    }
}

export async function getStaticProps({ params }) {
    try {
        const team = await fetchTeamDetails(params.id);
        return { props: { team } };
    } catch (error) {
        console.error('Error in getStaticProps:', error);
        return { props: { team: null } };
    }
}

export default TeamDetails;
