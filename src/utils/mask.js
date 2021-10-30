export const phoneMask = (value) => {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d\d)(\d)/g, '($1) $2');
  if (value.length < 14) value = value.replace(/(\d{4})(\d)/, '$1-$2');
  else value = value.replace(/(\d{5})(\d)/, '$1-$2');
  if (value.length > 15) value = value.substring(0, 15);
  return value;
};
