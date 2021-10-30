import {
  Button,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useHistory } from 'react-router';
import { OpportunitiesCheckbox } from '../../components/opportunitiesCheckbox';
import { ValidationFormLeads } from '../../utils/validation';
import { phoneMask } from '../../utils/mask';

const NewLead = () => {
  const history = useHistory();

  const parseOpportunities = (values) => {
    const opportunities = [];
    Object.keys(values).forEach((key) => {
      if (values[key] === true && key !== 'all') opportunities.push(key);
    });
    return opportunities;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      let leads = JSON.parse(window.localStorage.getItem('leads') ?? '[]');
      leads = [
        ...leads,
        {
          id: leads.length + 1,
          name: values.name,
          phone: values.phone,
          email: values.email,
          opportunities: parseOpportunities(values),
        },
      ];
      window.localStorage.setItem('leads', JSON.stringify(leads));
    }, 500);
  };

  return (
    <Container maxWidth="lg">
      <Button variant="outlined" onClick={() => history.push('/leads')}>
        <ArrowBackIcon />
        Voltar
      </Button>
      <Formik
        initialValues={{
          name: '',
          phone: '',
          email: '',
          all: false,
          rpa: false,
          digitalProduct: false,
          analytics: false,
          bpm: false,
        }}
        validate={ValidationFormLeads}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, { setSubmitting })
        }
      >
        {({
          submitForm,
          isSubmitting,
          errors,
          values,
          validateForm,
          setFieldValue,
        }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4">Novo Lead</Typography>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                item
                xs={10}
                md={6}
                spacing={2}
              >
                <Grid item xs={10}>
                  <Field
                    component={TextField}
                    name="name"
                    type="text"
                    label="Nome"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={10}>
                  <Field
                    component={TextField}
                    name="phone"
                    type="text"
                    label="Telefone"
                    onChange={(e) =>
                      setFieldValue('phone', phoneMask(e.target.value))
                    }
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={10}>
                  <Field
                    component={TextField}
                    name="email"
                    type="email"
                    label="Email"
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                item
                xs={8}
                md={6}
              >
                <OpportunitiesCheckbox
                  errors={errors}
                  values={values}
                  validateForm={validateForm}
                />
              </Grid>
              {isSubmitting && <LinearProgress />}
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                item
                xs={12}
              >
                <Grid item xs={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    fullWidth
                  >
                    SALVAR
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewLead;
