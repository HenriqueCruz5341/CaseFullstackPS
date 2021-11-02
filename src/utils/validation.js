const validateAllFields = (values, errors, requiredFields) => {
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Obrigatório';
    }
  });
};

const validatePassword = (values, errors) => {
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+-~´`.])(?=.{8,})/.test(
      values.password
    ) &&
    values.password
  )
    errors.password = 'Password inválido';
};

export const validationFormRegister = (values) => {
  const errors = {};
  const requiredFields = ['username', 'password', 'passwordConfirm'];

  validateAllFields(values, errors, requiredFields);
  validatePassword(values, errors);

  if (values.password !== values.passwordConfirm)
    errors.passwordConfirm = 'Passwords devem ser iguais';

  return errors;
};

export const validationFormLogin = (values) => {
  const errors = {};
  const requiredFields = ['username', 'password'];

  validateAllFields(values, errors, requiredFields);
  validatePassword(values, errors);

  return errors;
};

export const validationFormLeads = (values) => {
  const errors = {};
  const requiredFields = ['name', 'phone', 'email'];

  validateAllFields(values, errors, requiredFields);

  if (!Object.values(values).includes(true))
    errors.opportunities = 'Obrigatório';

  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
    values.email
  )
    errors.email = 'Email inválido';

  if (values.phone.length < 14 && values.phone)
    errors.phone = 'Telefone inválido';

  return errors;
};
