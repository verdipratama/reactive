import React, { useRef } from 'react';
import Layout from '../layout/Layout';
import { useHistory } from 'react-router-dom';
import useReadingTime from '../../utils/hooks/useReadingTime';

const AboutPage = () => {
  const history = useHistory();
  const post = useRef();
  const { readingTime, wordsCount } = useReadingTime(post);

  return (
    <Layout>
      <h2>About Page</h2>
      {readingTime} min • {wordsCount} words
      <p ref={post}>This page was loaded asynchronously!!!</p>
      <button onClick={() => history.push('/')}>Back to Home</button>
    </Layout>
  );
};

export default AboutPage;
