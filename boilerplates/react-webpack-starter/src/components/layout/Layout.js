import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider, Global } from '@emotion/react';
import { theme, globalStyle } from '../../styles';

import { Container, Row, Col } from '@mverissimoo/emotion-grid';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Container>
        <Row>
          <Col sm={8} lg={12}>
            <Link to="/">
              <h1>REACTIVE</h1>
            </Link>
            <Row>
              <Col sm={4} lg={6}>
                {children}
              </Col>
              <Col sm={4} lg={6}>
                <h2>About Myself</h2>
                <p>
                  Hey, this is my homepage, so I have to say something about
                  myself. Sometimes it is hard to introduce yourself because you
                  know yourself so well that you do not know where to start
                  with.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
