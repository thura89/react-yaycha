import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useApp } from '../ThemedApp';
import { useNavigate } from 'react-router-dom';


 const Login = () => {
    const navigate = useNavigate();
     const {setAuth}= useApp();
     
  return (
    <Box>
        <Typography variant='h3'>Login</Typography>
        <Alert severity='warning' sx={{mt:2}}>All Field Required</Alert>
        <form onSubmit={e => {
            e.preventDefault();
            setAuth(true);
            navigate('/');
        }}>
            <Box sx={{
                gap:1,display:'flex',flexDirection:'column',mt:2
            }}>
                <TextField placeholder='Username' fullWidth/>
                <TextField placeholder='Password' type='password' fullWidth/>
                <Button type='submit' variant='contained' fullWidth>
                    Login
                </Button>
            </Box>
        </form>
    </Box>
  )
}

export default Login