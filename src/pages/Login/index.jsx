import React from 'react';
import { loginStyle } from './style';
import { Typography, Button, TextField, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ValidationErrorMessage from '../../components/ValidationErrorMessage';
import authService from '../../service/auth.service';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/auth';

const Login = () => {
  const classes = loginStyle();
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address format')
      .required('Email is required'),
    password: Yup.string()
      .min(5, 'Password must be 5 characters at minimum')
      .required('Password is required'),
  });

  const onSubmit = (values) => {
    authService.login(values).then((res) => {
      delete res._id;
      delete res.__v;
      authContext.setUser(res);
      navigate('/');
      toast.success('Successfully logged in');
    });
  };
  return (
    // <div className={classes.loginWrapper}>
    //   <div className="login-page-wrapper">
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" mb={3}>
        Login To Your Account
      </Typography>
      {/* <div className="login-row"> */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">Registered Customers</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Box>
              <form onSubmit={handleSubmit}>
                <Box m={'25px 0'}>
                  <TextField
                    id="email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email Address *"
                    autoComplete="off"
                    variant="outlined"
                    inputProps={{ className: 'small' }}
                    sx={{ width: '400px' }}
                  />
                  <ValidationErrorMessage
                    message={errors.email}
                    touched={touched.email}
                  />
                </Box>
                <Box m={'25px 0'}>
                  <TextField
                    id="password"
                    name="password"
                    label="Password *"
                    type="password"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{ className: 'small' }}
                    autoComplete="off"
                    sx={{ width: '400px' }}
                  />
                  <ValidationErrorMessage
                    message={errors.password}
                    touched={touched.password}
                  />
                </Box>
                <Box m={'20px 0'}>
                  <Button
                    type="submit"
                    className="pink-btn btn"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                  &nbsp; &nbsp; &nbsp;
                  <Button
                    className="pink-btn btn"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      navigate('/register');
                    }}
                  >
                    Create an Account
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Formik>
      </Box>
      {/* </div> */}
    </Container>
    //   </div>
    // </div>
  );
};

export default Login;
