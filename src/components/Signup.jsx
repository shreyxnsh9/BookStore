import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormHelperText,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Signup(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    ></Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = async (values) => {
    // console.log(values);
    const payload = {
      firstName: values.fname,
      lastName: values.lname,
      email: values.email,
      roleId: 2,
      password: values.password,
    };
    console.log(payload);
  };

  const formValidation = Yup.object().shape({
    fname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8).max(15).required('Required'),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Formik
              initialValues={{ fname: '', lname: '', email: '', password: '' }}
              onSubmit={(values) => handleSubmit(values)}
              validationSchema={formValidation}
            >
              {({ values, errors, setFieldValue }) => {
                // console.log(errors);
                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="fname"
                          required
                          fullWidth
                          id="fname"
                          label="First Name"
                          autoFocus
                          error={errors.fname}
                          value={values.fname}
                          onChange={(e) => {
                            setFieldValue('fname', e.target.value);
                          }}
                        />
                        <FormHelperText>
                          <ErrorMessage name="fname" />
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lname"
                          label="Last Name"
                          name="lname"
                          autoComplete="family-name"
                          value={values.lname}
                          onChange={(e) => {
                            setFieldValue('lname', e.target.value);
                          }}
                        />
                        <FormHelperText>
                          <ErrorMessage name="lname" />
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={(e) => {
                            setFieldValue('email', e.target.value);
                          }}
                        />
                        <FormHelperText>
                          <ErrorMessage name="email" />
                        </FormHelperText>
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
                          value={values.password}
                          onChange={(e) => {
                            setFieldValue('password', e.target.value);
                          }}
                        />
                        <FormHelperText>
                          <ErrorMessage name="password" />
                        </FormHelperText>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography href="#" variant="body2">
                  Already have an account?{' '}
                  <NavLink to="/login">Sign in</NavLink>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Signup sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
