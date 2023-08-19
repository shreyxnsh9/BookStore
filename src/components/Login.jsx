import React, { useContext } from 'react';
import {
  Container,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  FormHelperText,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log(values);
    const payload = {
      email: values.email,
      password: values.password,
    };

    console.log(payload);
  };

  const formValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8).max(15).required('Required'),
  });

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={formValidation}
        >
          {({ values, errors, setFieldValue, handleBlur }) => {
            return (
              <Form>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={values.email}
                    onChange={(e) => setFieldValue('email', e.target.value)}
                    onBlur={handleBlur}
                  />
                  <FormHelperText>
                    <ErrorMessage name="email" />
                  </FormHelperText>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={(e) => setFieldValue('password', e.target.value)}
                    onBlur={handleBlur}
                  />
                  <FormHelperText>
                    <ErrorMessage name="password" />
                  </FormHelperText>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Typography href="#" variant="body2">
                        {"Don't have an account?"}{' '}
                        <NavLink to="/signup"> Sign Up </NavLink>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
