const roleNames = [
    'Admin',
    'Employee',
    'Customer',
]

export enum roleEnum {
    ADMIN = 1,
    EMPLOYEE,
    CUSTOMER
}

export const getRoleName = (roleId: number) => {
    return roleNames[roleId - 1];
}
