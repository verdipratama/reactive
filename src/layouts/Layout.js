import React, { Component } from 'react';
import { Container, Box, Card, Button } from '@material-ui/core';
import styled from 'styled-components';

const Wrapper = styled(Card)`
  padding: 4em;
  margin: auto;
  background: ${props => props.theme.colors.primary};
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: white;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

export class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Container container>
          <Box my={4}>
            <Wrapper>
              <Title>Welcome to Reactive</Title>
              <StyledButton>PRESS ME</StyledButton>
            </Wrapper>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

export default Layout;
