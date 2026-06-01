export enum CustomerType {
   Individual = 1,
   Company = 2,
}

export const customerTypeOptions = [
  {
    value: CustomerType.Individual,
    label: "Bireysel",
  },
  {
    value: CustomerType.Company,
    label: "Kurumsal",
  },
];