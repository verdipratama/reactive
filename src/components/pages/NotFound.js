import React from 'react';
import { Icon } from 'semantic-ui-react';

import Layout from '../layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <Icon name="minus circle" size="big" />
      <strong>Page not found!</strong>
    </Layout>
  );
};

export default NotFound;
