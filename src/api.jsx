// src/api.jsx
const API_KEY = '4e4179d85da6119f6dc7d75357d382ae'; // API key for authentication
const BASE_URL = 'https://v3.football.api-sports.io'; // Base URL for the API

// Function to fetch teams
export const fetchTeams = async () => {
    try {
        // Fetch teams data from the API
        const response = await fetch(`${BASE_URL}/teams?league=39&season=2023`, {
            headers: {
                'x-apisports-key': API_KEY, // Add API key to request headers
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Handle non-ok response
        }
        const data = await response.json(); // Parse the JSON response
        console.log('fetchTeams Response:', data); // Log the response data
        const teams = data.response.map(team => ({
            id: team.team.id, // Extract team ID
            name: team.team.name, // Extract team name
            founded: team.team.founded, // Extract team founded year
            country: team.team.country, // Extract team country
            logo: team.team.logo, // Extract team logo
            venue: {
                name: team.venue.name, // Extract venue name
                capacity: team.venue.capacity, // Extract venue capacity
            },
        }));

        // Sort teams alphabetically by name
        teams.sort((a, b) => a.name.localeCompare(b.name));

        return teams; // Return the sorted teams
    } catch (error) {
        console.error('Fetching teams failed:', error); // Log error if fetching fails
        return []; // Return an empty array on error
    }
};

// Function to fetch team details
export const fetchTeamDetails = async (teamId) => {
    try {
        // Fetch team details from the API
        const response = await fetch(`${BASE_URL}/teams?id=${teamId}`, {
            headers: {
                'x-apisports-key': API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Handle non-ok response
        }
        const data = await response.json(); // Parse the JSON response
        console.log('fetchTeamDetails Response:', data); // Log the response data
        const teamData = data.response[0]; // Extract the first response item
        return {
            id: teamData.team.id, // Extract team ID
            name: teamData.team.name, // Extract team name
            founded: teamData.team.founded, // Extract team founded year
            country: teamData.team.country, // Extract team country
            logo: teamData.team.logo, // Extract team logo
            venue: {
                name: teamData.venue.name, // Extract venue name
                capacity: teamData.venue.capacity, // Extract venue capacity
            },
        };
    } catch (error) {
        console.error('Fetching team details failed:', error); // Log error if fetching fails
        return null; // Return null on error
    }
};

// Function to fetch upcoming matches
export const fetchUpcomingMatches = async (teamId) => {
    try {
        // Fetch upcoming matches from the API
        const response = await fetch(`${BASE_URL}/fixtures?team=${teamId}&next=5`, {
            headers: {
                'x-apisports-key': API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Handle non-ok response
        }
        const data = await response.json();
        console.log('fetchUpcomingMatches Response:', data);
        return data.response; // Return the fixtures data
    } catch (error) {
        console.error('Fetching upcoming matches failed:', error);
        return []; // Return an empty array on error
    }
};

// Function to fetch team players
export const fetchTeamPlayers = async (teamId, season = '2023') => {
    try {
        console.log(`Fetching players for team ${teamId} for season ${season}`);
        // Fetch team players from the API
        const response = await fetch(`${BASE_URL}/players?team=${teamId}&season=${season}`, {
            headers: {
                'x-apisports-key': API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Handle non-ok response
        }
        const data = await response.json();
        console.log(`fetchTeamPlayers Response for ${teamId} season ${season}:`, data); // Log the response data
        return data.response; // Return the players data
    } catch (error) {
        console.error(`Fetching team players failed for ${teamId} season ${season}:`, error); // Log error if fetching fails
        return []; // Return an empty array on error
    }
};
