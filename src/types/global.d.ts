interface RoleType {
  uuid: string;
  permission?: string;
  name: string;
  color: string;
}

interface UserType {
  uuid?: string;
  name: string;
  email: string;
  firstName: string;
  image: string;
  emailVerified: string;
  role: string;
}

interface SiteSettingsType {
  uuid: string;
  identify: string;
  name: string;
  description: string;
  theme: string;
  color: string;
  favicon: string;
  logo: string;
  maintenance: boolean;
  maintenanceMessage: string;
  email: string;
  phone: number;
  address: string;
}
interface PermissionType {
  uuid: string;
  name: string;
}
