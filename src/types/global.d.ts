
interface RoleType {
    uuid: Key;
    permission: string;
    name: string;
    color: string;
}

interface UserType{
    uuid: Key;
    name: string;
    email: string;
    firstName: string;
    image: string;
    emailVerified: string;
    role: string;

}

interface PermissionType {
    uuid: Key;
    name: string;
}