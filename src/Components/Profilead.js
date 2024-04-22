import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../Components/navbar';

const defaultTheme = createTheme();

export default function UserProfile() {
  const [userData, setUserData] = useLocalStorage('userData', {
    firstName: 'Arij',
    lastName: 'Krir',
    email: 'Arijkrir5@gmail.com',
    phoneNumber: '27631968',
    program: 'FI-A2-GL',
    group: 'Group 4',
    password: 'password123', // Ajout du champ de mot de passe
  });

  const [avatarFile, setAvatarFile] = useLocalStorage('avatarFile', null);

  const [editingField, setEditingField] = React.useState(null);

  const handleEdit = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleSave = () => {
    setEditingField(null);
    // Sauvegarder les modifications
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(URL.createObjectURL(file));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Navbar />
        <Box
          sx={{
            marginTop: 13,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="avatar-file"
            type="file"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar-file">
            <Avatar
              src={avatarFile ? avatarFile : "/path/to/user/image.jpg"}
              alt="User Image"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          </label>
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              disabled={editingField !== 'firstName'}
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              value={userData.firstName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              disabled={editingField !== 'lastName'}
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              disabled={editingField !== 'email'}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userData.email}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => handleEdit('email')}>
                    <EditIcon />
                  </IconButton>
                ),
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              disabled={editingField !== 'phoneNumber'}
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => handleEdit('phoneNumber')}>
                    <EditIcon />
                  </IconButton>
                ),
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              disabled={editingField !== 'password'}
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={userData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => handleEdit('password')}>
                    <EditIcon />
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
