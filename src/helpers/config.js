const getCountryConfig = config => {
  return config && config.location && config.location.country ? config.location.country : {};
};

export { getCountryConfig };
