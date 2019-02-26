const responseSuccess = (response) => {
  if (response.status !== 200) {
    return 0;
  }
  if (!response.data) {
    return 0;
  }
  if (response.data.error_code !== null) {
    if (response.data.error_code === 'WAR001') {
      return -1;
    }
    if (response.data.error_code === 'WAR002') {
      return -2;
    }
    return 0;
  }
  if (response.data.response.toUpperCase() !== 'SUCCESS')
    return 0;
  return 1;
};

export {
  responseSuccess,
};
