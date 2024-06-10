import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../../../lib/theme';
import { Alert, MenuItem, Select, Snackbar } from '@mui/material';
import { roles } from '../../../controller/variable-controller';
import { auth, firestore } from '../../../lib/firebase-database';
import { useRouter } from 'next/router';
import { setDoc, doc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function CreateAccount() {

  const [staff, setStaff] = React.useState<Account>({
    email: '',
    password: '',
    name: '',
    role: '',
  });
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarStatus, setSnackbarStatus] = React.useState<'error' | 'success'>('error');;

  const handleRegister = async (e) => {
    e.preventDefault()

    const { name, email, password, role } = staff

    if(name == '' || email == '' || password == '' || confirmPassword == '' || role == ''){
      setOpenSnackbar(true)
      setSnackbarMessage("Every field must be filled!")
      setSnackbarStatus('error')
      return
    }

    if(password != confirmPassword){
      setOpenSnackbar(true)
      setSnackbarMessage("Password do not match!")
      setSnackbarStatus('error')
      return
    }

    try {
      createUserWithEmailAndPassword(auth, email, password)
      .then((account) => {
        setDoc(doc(firestore, 'staff', account.user.uid), {
            name: name,
            role: role
          })
      })

      setOpenSnackbar(true)
      setSnackbarMessage('Successfully create staff account!')
      setSnackbarStatus('success')

    } catch (error) {
      setOpenSnackbar(true)
      setSnackbarMessage(error.message)
      setSnackbarStatus('error')
    }


  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setStaff(prevStaff => ({
      ...prevStaff,
      [name]: value
      
    }))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Staff Account
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  onChange={handleChange}
                  value={staff.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={staff.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={staff.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={(e) =>{
                    setConfirmPassword(e.target.value)
                  }}
                  value={confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                name='role' 
                label='Role' 
                select
                fullWidth
                required
                value={staff.role}
                onChange={handleChange}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200
                      }
                    }
                  }
                }}               
                >
                  {roles.map((role, index) => (
                    <MenuItem key={index} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Create Account
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarStatus}>
              {snackbarMessage}
            </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}