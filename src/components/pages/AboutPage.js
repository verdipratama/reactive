import React from 'react';
import Layout from '../layout/Layout';
import { useHistory } from 'react-router-dom';

const AboutPage = () => {
  const history = useHistory();

  return (
    <Layout>
      <h2>About Page</h2>
      <p>This page was loaded asynchronously!!!</p>
      <button onClick={() => history.push('/')}>Back to Home</button>
    </Layout>
  );
};

export default AboutPage;
