export type Payment = {
  id: number;
  demand: number;
  agreed: number;
  partner: {
    id: number;
    email: string;
  };
  status: {
    id: number;
    name: string;
  };
};

export type dataError = {
  message: string;
};

export type Partner = {
  id: number;
  name: string;
  email: string;
  city: string;
  country: {
    id: number;
    name: string;
  };
};
