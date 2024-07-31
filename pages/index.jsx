import React from 'react';
import TeamList from '../src/components/TeamList';
import { fetchTeams } from '../src/api';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 5rem;
`;

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  background-color: #343a40;
  padding: 1rem;
`;

const NavbarBrand = styled.h1`
  color: #fff;
`;

export default function Home({ teams }) {
  return (
      <Container>
        <Navbar>
          <NavbarBrand>Football Teams</NavbarBrand>
        </Navbar>
        <TeamList teams={teams} />
      </Container>
  );
}

export async function getStaticProps() {
  const teams = await fetchTeams();
  return {
    props: {
      teams,
    },
  };
}
