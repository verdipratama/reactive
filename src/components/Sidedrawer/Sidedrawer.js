import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Paper,
  Divider,
  ListItemAvatar
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

const Sidedrawer = () => {
  return (
    <Paper
      style={{
        height: '100%',
        width: 255,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText>Search</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LibraryMusicIcon />
          </ListItemIcon>
          <ListItemText>My Library</ListItemText>
        </ListItem>

        <Divider />
        <ListItem>
          <Typography variant="caption">Recently Played</Typography>
        </ListItem>
      </List>
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
          href="https://www.github.com/verdipratama/reactive"
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
