import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';

import Layout from '../layout/Layout';

const Home = () => {
  return (
    <Layout>
      <Grid stackable columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Hello World</Header>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
              ipsum, molestias harum nihil expedita sed suscipit impedit dicta
              molestiae autem deserunt, sit velit recusandae nisi dignissimos
              laborum voluptatibus! Eligendi, consequuntur. Lorem ipsum dolor,
              sit amet consectetur adipisicing elit. Reprehenderit nulla aut
              necessitatibus dolore, unde doloribus soluta dolores impedit
              excepturi velit eveniet provident? Error nihil perspiciatis
              temporibus excepturi! Explicabo, incidunt beatae.
            </p>
            <Link to="/about">Navigate to Dynamic Page</Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default Home;
