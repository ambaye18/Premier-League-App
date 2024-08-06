// src/api.jsx

const API_KEY = 'b10af43bb1ccfe0e72dfb13d2de0cd94';
const BASE_URL = 'https://v3.football.api-sports.io';

export const fetchTeams = async () => {
    try {
        const response = await fetch(`${BASE_URL}/teams?league=39&season=2023`, {
            headers: {
                'x-apisports-key': API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('fetchTeams Response:', data);
        const teams = data.response.map(team => ({
            id: team.team.id,
            name: team.team.name,
            founded: team.team.founded,
            country: team.team.country,
            logo: team.team.logo,
            venue: {
                name: team.venue.name,
                capacity: team.venue.capacity,
            },
        }));

        // Sort teams alphabetically by name
        teams.sort((a, b) => a.name.localeCompare(b.name));

        return teams;
    } catch (error) {
        console.error('Fetching teams failed:', error);
        return [];
    }
};

export const fetchTeamDetails = async (teamId) => {
    try {
        const response = await fetch(`${BASE_URL}/teams?id=${teamId}`, {
            headers: {
                'x-apisports-key': API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('fetchTeamDetails Response:', data);
        const teamData = data.response[0];
        return {
            id: teamData.team.id,
            name: teamData.team.name,
            founded: teamData.team.founded,
            country: teamData.team.country,
            logo: teamData.team.logo,
            venue: {
                name: teamData.venue.name,
                capacity: teamData.venue.capacity,
            },
        };
    } catch (error) {
        console.error('Fetching team details failed:', error);
        return null;
    }
};

export const fetchUpcomingMatches = async (teamId) => {
    try {
        const response = await fetch(`${BASE_URL}/fixtures?team=${teamId}&next=5`, {
            headers: {
                'x-apisports-key': API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('fetchUpcomingMatches Response:', data);
        return data.response;
    } catch (error) {
        console.error('Fetching upcoming matches failed:', error);
        return [];
    }
};

export const fetchTeamPlayers = async (teamId, season = '2023') => {
    try {
        console.log(`Fetching players for team ${teamId} for season ${season}`);
        const response = await fetch(`${BASE_URL}/players?team=${teamId}&season=${season}`, {
            headers: {
                'x-apisports-key': API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(`fetchTeamPlayers Response for ${teamId} season ${season}:`, data);
        return data.response;
    } catch (error) {
        console.error(`Fetching team players failed for ${teamId} season ${season}:`, error);
        return [];
    }
};
