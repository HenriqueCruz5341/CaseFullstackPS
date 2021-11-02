import { Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { Field, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../components/userProvider';
import { validationFormLogin } from '../../utils/validation';
import { StyledContainer, StyledForm } from './styles';

const Login = () => {
  const { signIn } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      try {
        signIn(values.username, values.password);
        toast.success('Login efetuado com sucesso!');
        history.push('/leads');
      } catch (error) {
        toast.error('Username ou password inválidos.');
      }
    }, 500);
  };

  return (
    <StyledContainer maxWidth="sm">
      <Paper>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Typography variant="h4">Login</Typography>
          </Grid>

          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validate={validationFormLogin}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, { setSubmitting })
            }
          >
            {({ submitForm, isSubmitting }) => (
              <StyledForm>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                  item
                  xs={12}
                >
                  <Grid item xs={10}>
                    <Field
                      component={TextField}
                      name="username"
                      type="text"
                      label="Usuário"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Field
                      component={TextField}
                      type="password"
                      label="Password"
                      name="password"
                      fullWidth
                      required
                    />
                  </Grid>
                  {isSubmitting && <LinearProgress />}
                  <Grid item xs={8}>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                      fullWidth
                    >
                      Entrar
                    </Button>
                  </Grid>
                </Grid>
              </StyledForm>
            )}
          </Formik>
        </Grid>
      </Paper>
    </StyledContainer>
  );
};

export default Login;
