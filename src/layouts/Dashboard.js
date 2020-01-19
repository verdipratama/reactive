import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Sidedrawer from '../components/Sidedrawer/Sidedrawer';
import styled from 'styled-components';

const GridSidedrawer = styled(Grid)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
`;

const GridHomePage = styled(Grid)`
  padding-bottom: 100px;
  width: 100%;
`;

const Background = styled.div`
  background-image: linear-gradient(rgb(58, 91, 95), rgb(6, 9, 10) 85%);
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1000;
`;

export class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Background />
        <Grid container>
          <GridSidedrawer item lg={2}>
            <Sidedrawer />
          </GridSidedrawer>
          <GridHomePage item lg={12}>
            {/* HAHAHA */}
          </GridHomePage>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Dashboard;
