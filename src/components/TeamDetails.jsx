import React from 'react'; // Import React library
import styled from 'styled-components'; // Import styled-components for styling
import { fetchTeams, fetchTeamDetails } from '../../src/api'; // Import API functions
import UpcomingMatchesCard from '../../src/components/UpcomingMatchesCard'; // Import UpcomingMatchesCard component
import TeamRostersCard from '../../src/components/TeamRostersCard'; // Import TeamRostersCard component

// Styled component for the main container
const Container = styled.div`
padding: 20px;
max-width: 1200px;
margin: auto;
`;

// Styled component for card layout
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

// Styled component for the team logo
const Logo = styled.img`
width: 100px;
height: auto;
margin-bottom: 10px;
`;

// Styled component for the back button
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

// Styled component for the team details container
const TeamDetailsContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

// Component to display team details
const TeamDetails = ({ team }) => {
    const router = useRouter(); // Use Next.js router

    if (!team) return <div>Loading...</div>; // Show loading if team data is not available

    return (
        <Container>
            <Card>
                {team.logo && <Logo src={team.logo} alt={`${team.name} logo`} />} {/* Display team logo */}
                <h2>{team.name}</h2> {/* Display team name */}
                <p>{`Founded: ${team.founded}`}</p> {/* Display team founded year */}
                <p>{`Country: ${team.country}`}</p> {/* Display team country */}
                <p>{`Stadium: ${team.venue.name}`}</p> {/* Display team stadium name */}
                <p>{`Capacity: ${team.venue.capacity}`}</p> {/* Display team venue capacity */}
                <BackButton onClick={() => router.back()}>Back</BackButton> {/* Back button to navigate to previous page */}
            </Card>
            <Card>
                <h2>Upcoming Matches</h2> {/* Section for upcoming matches */}
                <UpcomingMatchesCard teamId={team.id} /> {/* Component to display upcoming matches */}
            </Card>
            <Card>
                <h2>Roster</h2> {/* Section for team roster */}
                <TeamRostersCard teamId={team.id} /> {/* Component to display team roster */}
            </Card>
        </Container>
    );
}

// Function to fetch static paths for the teams
export async function getStaticPaths() {
    try {
        const teams = await fetchTeams(); // Fetch list of teams
        console.log('Teams:', teams); // Log the teams data to check structure
        const paths = teams.map(team => ({
            params: { id: team.id.toString() }, // Generate paths for static generation
        }));
        return { paths, fallback: true }; // Return paths and fallback option
    } catch (error) {
        console.error('Error in getStaticPaths:', error); // Log error if fetching teams fails
        return { paths: [], fallback: true }; // Return empty paths and fallback option on error
    }
}

// Function to fetch team details for static props
export async function getStaticProps({ params }) {
    try {
        const team = await fetchTeamDetails(params.id); // Fetch team details based on id
        return { props: { team } }; // Return team details as props
    } catch (error) {
        console.error('Error in getStaticProps:', error); // Log error if fetching team details fails
        return { props: { team: null } }; // Return null team on error
    }
}

export default TeamDetails; // Export the TeamDetails component as default export
