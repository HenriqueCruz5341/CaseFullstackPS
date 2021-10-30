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

const INITIAL_STATE = {
  rpa: false,
  digitalProduct: false,
  analytics: false,
  bpm: false,
};

export const OpportunitiesCheckbox = ({ errors, values, validateForm }) => {
  const [checked, setChecked] = useState(INITIAL_STATE);

  useEffect(() => {
    if (checked !== INITIAL_STATE) {
      values.all = !Object.values(checked).includes(false);
      values.rpa = checked.rpa;
      values.digitalProduct = checked.digitalProduct;
      values.analytics = checked.analytics;
      values.bpm = checked.bpm;
      validateForm();
    }
  }, [checked, validateForm, values]);

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

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl
          required
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
          name="opportunities"
          error={!!errors.opportunities}
        >
          <FormLabel component="legend">Oportunidades</FormLabel>
          {!!errors.opportunities && (
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
    </Grid>
  );
};
