type APILoginResponse = {
  user: {
    id: number;
    email: string;
    name: string;
    token: string;
  };
};

export default APILoginResponse;
