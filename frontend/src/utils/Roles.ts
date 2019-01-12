const roleNames = [
    'Admin',
    'Employee',
    'Customer',
];

export enum roleEnum {
    ADMIN = 1,
    EMPLOYEE,
    CUSTOMER
}

export const getRoleName = (roleId: number) => {
    return roleNames[roleId - 1];
}

export const isValidRole = (index: number) => {
    return roleNames.includes(roleNames[index - 1]);
}
