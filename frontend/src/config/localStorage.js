export const loadToken = () => {
  try {
    const localToken = localStorage.getItem('token');
    if (localToken === null) {
      return undefined;
    }
    // return JSON.parse(localToken);
    return localToken;
  } catch(err) {
    return undefined;
  }
};

export const saveToken = (token) => {
  try {
    // const localToken = JSON.stringify(token);
    localStorage.setItem('token', token);
  } catch(err) {
    console.error(err);
  }
}