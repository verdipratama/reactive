import React from 'react';
import { ListItem, ListItemText, Avatar, Paper, ListItemAvatar } from '@material-ui/core';

const Sidedrawer = () => {
  return (
    <Paper
      style={{
        height: '100%',
        width: 255,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '73%',
          left: 0,
          width: '100%'
        }}
      >
        <a
          href="https://www.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <ListItem button>
            <ListItemAvatar>
              <Avatar style={{ width: 25, height: 25 }} />
            </ListItemAvatar>
            <ListItemText secondary="Spotify.com" />
          </ListItem>
        </a>
        <a
          href="https://www.github.com/idanlo/react-spotify"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <ListItem button>
            <ListItemAvatar>
              <Avatar
                style={{
                  width: 25,
                  height: 25
                }}
              />
            </ListItemAvatar>
            <ListItemText secondary="Github Repo" />
          </ListItem>
        </a>
      </div>
    </Paper>
  );
};

export default Sidedrawer;
