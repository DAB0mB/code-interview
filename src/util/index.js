export * from 'util';

const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

export const upperFirst = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const zeroTimezone = (timestamp) => {
  return timestamp + timezoneOffset;
};
