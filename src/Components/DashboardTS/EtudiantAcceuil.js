import React from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';

const App = () => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="h4">ESat</Typography>
        <Typography variant="subtitle1">Your Source for News, Events, and Courses</Typography>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="h6">News</Typography>
            {/* Render news articles */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="h6">Events</Typography>
            {/* Render upcoming events */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="h6">Courses</Typography>
            {/* Render course listings */}
          </Paper>
        </Grid>
      </Grid>
      <footer style={{ marginTop: 16, textAlign: 'center' }}>
        <Typography variant="body2">Join our mailing list for updates!</Typography>
        <Button variant="contained" color="primary">
          Subscribe
        </Button>
      </footer>
    </Container>
  );
};

export default App;
