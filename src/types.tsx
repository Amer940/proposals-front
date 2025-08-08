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

export type createProposalType = {
  demand: string | number | null;
  agreed: string | number | null;
  paid: string | number | null;
  partner: string;
  partner_id: number | null;
  status: string;
  status_id: number | null;
};

export type editProposalType = {
  id: number;
  demand: string | number | null;
  agreed: string | number | null;
  paid: string | number | null;
  partner: string;
  partner_id: number | null;
  status: string;
  status_id: number | null;
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

export type selectFieldType = {
  label: string;
  value: string | number;
};

export type monthlyPartner = {
  date: string;
  created: number;
};

export type yearlyPartner = {
  date: string;
  createdYearly: number;
};

export type initialValuesProposal = {
  id: number;
  demand: number | null;
  agreed: number;
  paid: number;
  partner: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
};

export type initialValuesPartner = {
  id: number;
  name: string;
  email: string;
  city: string;
  country: {
    id: number;
    name: string;
  };
  description: string;
};

export type monthlyAnalytics = {
  date: string;
  months: number;
};

export type yearlyAnalytics = {
  date: string;
  year: number;
};

export type proposalsAnalytics = {
  date: string;
  sent: number;
  accepted: number;
  denied: number;
  ignored: number;
};

export type createPartnerType = {
  name: string;
  email: string;
  country: string;
  country_id: number | null;
  city: string;
  description: string;
};

export type editPartnerType = {
  id: number;
  name: string;
  email: string;
  country: string;
  country_id: number | null;
  city: string;
  description: string;
};
