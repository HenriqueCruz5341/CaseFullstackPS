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
      values.password
    )
  )
    errors.password = 'Password inválido';

  if (values.password !== values.passwordConfirm)
    errors.passwordConfirm = 'Passwords devem ser iguais';

  return errors;
};
