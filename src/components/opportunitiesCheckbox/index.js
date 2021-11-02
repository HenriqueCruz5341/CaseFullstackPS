import { useState, useEffect } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from '@mui/material';
import { HelperText } from './styles';
import initialData from '../../utils/constants';

export const OpportunitiesCheckbox = ({
  errors,
  values,
  touched,
  setFieldTouched,
}) => {
  const [checked, setChecked] = useState(initialData.opportunities);

  useEffect(() => {
    if (checked !== initialData.opportunities) {
      values.all = !Object.values(checked).includes(false);
      values.rpa = checked.rpa;
      values.digitalProduct = checked.digitalProduct;
      values.analytics = checked.analytics;
      values.bpm = checked.bpm;
      setFieldTouched('opportunities', true);
    }
  }, [checked, values, setFieldTouched]);

  const handleChange = (e) => {
    if (e.target.name === 'all') {
      setChecked({
        rpa: e.target.checked,
        digitalProduct: e.target.checked,
        analytics: e.target.checked,
        bpm: e.target.checked,
      });
    } else {
      setChecked({
        ...checked,
        [e.target.name]: e.target.checked,
      });
    }
  };

  const hasError = () => {
    const error1 = !!errors.opportunities && touched.opportunities;
    const error2 = Object.keys(errors).length === 1 && errors.opportunities;
    if (error1 || error2) return true;

    return false;
  };

  return (
    <Grid container item xs={12}>
      <FormControl
        required
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
        name="opportunities"
        error={hasError()}
      >
        <FormLabel component="legend">Oportunidades</FormLabel>
        {hasError() && (
          <HelperText>Selecione pelo menos uma oportunidade</HelperText>
        )}
        <FormGroup>
          <FormControlLabel
            label="Todos"
            control={
              <Checkbox
                checked={!Object.values(checked).includes(false)}
                onChange={handleChange}
                name="all"
              />
            }
          />
          <FormControlLabel
            label="RPA"
            control={
              <Checkbox
                checked={checked.rpa}
                onChange={handleChange}
                name="rpa"
              />
            }
          />
          <FormControlLabel
            label="Produto Digital"
            control={
              <Checkbox
                checked={checked.digitalProduct}
                onChange={handleChange}
                name="digitalProduct"
              />
            }
          />
          <FormControlLabel
            label="Analytics"
            control={
              <Checkbox
                checked={checked.analytics}
                onChange={handleChange}
                name="analytics"
              />
            }
          />
          <FormControlLabel
            label="BPM"
            control={
              <Checkbox
                checked={checked.bpm}
                onChange={handleChange}
                name="bpm"
              />
            }
          />
        </FormGroup>
      </FormControl>
    </Grid>
  );
};
