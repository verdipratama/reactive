import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';

const Home = () => {
  return (
    <Layout>
      <h2>Homepage</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
        placeat quia eveniet error magnam ea corrupti aut, totam accusamus enim,
        doloremque nulla provident, rerum iusto tempore. Dolores sunt qui
        commodi. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Quidem explicabo vel, tempora ut repellendus odit cumque labore
        consectetur aspernatur neque quasi? Exercitationem, dignissimos ipsum?
        Laudantium necessitatibus nihil repellendus obcaecati perspiciatis.
      </p>
      <Link to="/about">Navigate to Dynamic Page</Link>
    </Layout>
  );
};

export default Home;
