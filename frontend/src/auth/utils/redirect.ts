export const redirect = (path: string | undefined) => {
  return {
    redirect: {
      destination: path || "/login",
      permanent: false,
    },
  };
};
