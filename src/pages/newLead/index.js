import { Button, Container, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useHistory } from 'react-router';
import { OpportunitiesCheckbox } from '../../components/opportunitiesCheckbox';
import { validationFormLeads } from '../../utils/validation';
import { phoneMask } from '../../utils/mask';
import { toast } from 'react-toastify';

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
          status: 'Cliente em Potencial',
          opportunities: parseOpportunities(values),
        },
      ];
      window.localStorage.setItem('leads', JSON.stringify(leads));
      toast.success('Lead cadastrada com sucesso!');
      history.push('/leads');
    }, 500);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Novo Lead</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => history.push('/leads')}>
            <ArrowBackIcon />
            Voltar
          </Button>
        </Grid>
        <Grid container item xs={12}>
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
            validate={validationFormLeads}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, { setSubmitting })
            }
          >
            {({
              submitForm,
              isSubmitting,
              errors,
              values,
              touched,
              status,
              setFieldTouched,
              setFieldValue,
            }) => (
              <Form style={{ width: '100%' }}>
                <Grid container spacing={2} justifyContent="space-between">
                  <Grid container spacing={3} item xs={12} sm={8} md={5}>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        name="name"
                        type="text"
                        label="Nome"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                  <Grid item xs={12} sm={4}>
                    <OpportunitiesCheckbox
                      errors={errors}
                      values={values}
                      touched={touched}
                      setFieldTouched={setFieldTouched}
                      status={status}
                    />
                  </Grid>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewLead;
