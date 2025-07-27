type Payment = {
  id: string;
  amount: number;
  demand: number;
  status: "Sent" | "Denied" | "Success" | "Ignored";
  email: string;
};

export const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    demand: 150,
    status: "Sent",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 0,
    demand: 80,
    status: "Denied",
    email: "test@gmail.com",
  },
  {
    id: "489e1d42",
    amount: 70,
    demand: 70,
    status: "Success",
    email: "ananas@gmail.com",
  },
  {
    id: "489e1d42",
    amount: 0,
    demand: 300,
    status: "Ignored",
    email: "banana@gmail.com",
  },
  // ...
];
