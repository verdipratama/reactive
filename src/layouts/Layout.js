import React, { Component } from 'react';
import { withWidth, Grid } from '@material-ui/core';
import styled from 'styled-components';

const GridSidedrawer = styled(Grid)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: red;
`;

const GridHomePage = styled(Grid)`
  padding-bottom: 100px;
  width: 100%;
`;

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <div className="container">
          <div className="home">
            <h1>Welcome to Reactive</h1>
            <h2>Happy coding :)</h2>
          </div>
        </div> */}
        <Grid container>
          <GridSidedrawer item lg={2}>
            <h1>Hello World</h1>
          </GridSidedrawer>
          <GridHomePage item lg={12} />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withWidth()(Layout);
