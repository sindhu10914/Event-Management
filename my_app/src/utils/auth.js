export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
};

export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};
