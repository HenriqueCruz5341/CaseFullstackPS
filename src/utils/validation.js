export const ValidationFormRegister = (values) => {
  const errors = {};
  const requiredFields = ['username', 'password', 'passwordConfirm'];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Obrigatório';
    }
  });

  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
      values.password && values.password
    )
  )
    errors.password = 'Password inválido';

  if (values.password !== values.passwordConfirm)
    errors.passwordConfirm = 'Passwords devem ser iguais';

  return errors;
};

export const ValidationFormLeads = (values) => {
  const errors = {};
  const requiredFields = ['name', 'phone', 'email'];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Obrigatório';
    }
  });

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
