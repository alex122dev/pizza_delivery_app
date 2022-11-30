export const phoneMaskFormat = (phone: string): string => {
  const validPhone = `+38 (0${phone.substring(3, 5)}) ${phone.substring(
    5,
    8,
  )}-${phone.substring(8, 10)}-${phone.substring(10)}`;

  // 380956446464 => +38 (095) 644-64-64
  return validPhone;
};
