import { Button, Grid, LinearProgress, Paper } from '@mui/material';
import { Field, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/images/Logo.svg';
import { UserContext } from '../../components/userProvider';
import { ValidationFormRegister } from '../../utils/validation';
import { StyledContainer, StyledForm } from './styles';

const Register = () => {
  const { signIn } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      signIn(values.username);
      toast.success('Usuário cadastrado com sucesso!');
      history.push('/leads');
    }, 500);
  };

  return (
    <StyledContainer maxWidth="sm">
      <Paper>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <img src={Logo} alt="logo" />
          </Grid>

          <Formik
            initialValues={{
              username: '',
              password: '',
              passwordConfirm: '',
            }}
            validate={ValidationFormRegister}
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
                  <Grid item xs={10}>
                    <Field
                      component={TextField}
                      type="password"
                      label="Confirmação Password"
                      name="passwordConfirm"
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
                      Salvar
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

export default Register;
