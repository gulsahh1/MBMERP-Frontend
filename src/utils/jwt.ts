export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  };
};

export const isTokenExpired = (token: string) => {
  const decoded = parseJwt(token);
  if (!decoded) return true;

  return decoded.exp < Date.now() / 1000;
};