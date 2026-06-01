export enum RoleType {
 Admin = 1,
 Manager = 2,
 User = 3
}

export const roleTypeOptions = [
  {
    value: RoleType.Admin,  
    label: "Admin",
    },
    {
    value: RoleType.Manager,
    label: "Yönetici",
    },
    {
    value: RoleType.User,
    label: "Kullanıcı",
    },
];
