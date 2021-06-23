import React from 'react';
import { Header } from 'semantic-ui-react';

import Layout from '../layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <Header as="h2">About Page</Header>
      <p>This page was loaded asynchronously!!!</p>
    </Layout>
  );
};

export default AboutPage;
