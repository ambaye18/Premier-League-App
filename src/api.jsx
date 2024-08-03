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
        return data.response.map(team => ({
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
    } catch (error) {
        console.error('Fetching teams failed:', error);
        return [];
    }
};
