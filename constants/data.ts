import { Icons } from '@/components/icons';
import { NavItem, SidebarNavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

//alterar
export type Atletas = {
  id: number;
  nome: string;
  setor: string;
  posicao: string;
  ativo: boolean;
  numero: string;
};
export const atletas: Atletas[] = [
  {
    id: 1,
    nome: 'Candice Schiner',
    setor: 'Dell',
    posicao: 'Frontend Developer',
    ativo: false,
    numero: 'Active'
  },
  {
    id: 2,
    nome: 'John Doe',
    setor: 'TechCorp',
    posicao: 'Backend Developer',
    ativo: true,
    numero: 'Active'
  },
  {
    id: 3,
    nome: 'Alice Johnson',
    setor: 'WebTech',
    posicao: 'UI Designer',
    ativo: true,
    numero: 'Active'
  },
  {
    id: 4,
    nome: 'David Smith',
    setor: 'Innovate Inc.',
    posicao: 'Fullstack Developer',
    ativo: false,
    numero: 'Inactive'
  },
  {
    id: 5,
    nome: 'Emma Wilson',
    setor: 'TechGuru',
    posicao: 'Product Manager',
    ativo: true,
    numero: 'Active'
  },
  {
    id: 6,
    nome: 'James Brown',
    setor: 'CodeGenius',
    posicao: 'QA Engineer',
    ativo: false,
    numero: 'Active'
  },
  {
    id: 7,
    nome: 'Laura White',
    setor: 'SoftWorks',
    posicao: 'UX Designer',
    ativo: true,
    numero: 'Active'
  },
  {
    id: 8,
    nome: 'Michael Lee',
    setor: 'DevCraft',
    posicao: 'DevOps Engineer',
    ativo: false,
    numero: 'Active'
  },
  {
    id: 9,
    nome: 'Olivia Green',
    setor: 'WebSolutions',
    posicao: 'Frontend Developer',
    ativo: true,
    numero: 'Active'
  },
  {
    id: 10,
    nome: 'Robert Taylor',
    setor: 'DataTech',
    posicao: 'Data Analyst',
    ativo: false,
    numero: 'Active'
  },
  {
    id: 11,
    nome: 'Robert Taylor',
    setor: 'DataTech',
    posicao: 'Data Analyst',
    ativo: false,
    numero: 'Active'
  },
  {
    id: 12,
    nome: 'Robert Taylor',
    setor: 'DataTech',
    posicao: 'Data Analyst',
    ativo: false,
    numero: 'Active'
  },
  {
    id: 1,
    nome: 'Candice Schiner',
    setor: 'Dell',
    posicao: 'Frontend Developer',
    ativo: false,
    numero: 'Active'
  },
  {
    id: 2,
    nome: 'John Doe',
    setor: 'TechCorp',
    posicao: 'Backend Developer',
    ativo: true,
    numero: 'Active'
  },
  {
    id: 3,
    nome: 'Alice Johnson',
    setor: 'WebTech',
    posicao: 'UI Designer',
    ativo: true,
    numero: 'Active'
  },
  {
    id: 4,
    nome: 'David Smith',
    setor: 'Innovate Inc.',
    posicao: 'Fullstack Developer',
    ativo: false,
    numero: 'Inactive'
  },
  {
    id: 5,
    nome: 'Emma Wilson',
    setor: 'TechGuru',
    posicao: 'Product Manager',
    ativo: true,
    numero: 'Active'
  },
  {
    id: 6,
    nome: 'James Brown',
    setor: 'CodeGenius',
    posicao: 'QA Engineer',
    ativo: false,
    numero: 'Active'
  },
  {
    id: 7,
    nome: 'Laura White',
    setor: 'SoftWorks',
    posicao: 'UX Designer',
    ativo: true,
    numero: 'Active'
  },
  {
    id: 8,
    nome: 'Michael Lee',
    setor: 'DevCraft',
    posicao: 'DevOps Engineer',
    ativo: false,
    numero: 'Active'
  },
  {
    id: 9,
    nome: 'Olivia Green',
    setor: 'WebSolutions',
    posicao: 'Frontend Developer',
    ativo: true,
    numero: 'Active'
  },
  {
    id: 10,
    nome: 'Robert Taylor',
    setor: 'DataTech',
    posicao: 'Data Analyst',
    ativo: false,
    numero: 'Active'
  },
  {
    id: 11,
    nome: 'Robert Taylor',
    setor: 'DataTech',
    posicao: 'Data Analyst',
    ativo: false,
    numero: 'Active'
  },
  {
    id: 12,
    nome: 'Robert Taylor',
    setor: 'DataTech',
    posicao: 'Data Analyst',
    ativo: false,
    numero: 'Active'
  }
];


export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Atleta',
    href: '/dashboard/atleta',
    icon: 'bookCheck',
    label: 'Atleta'
  },
  {
    title: 'Perfil',
    href: '/dashboard/perfil',
    icon: 'profile',
    label: 'profile'
  },

 /*  {
    title: 'User',
    href: '/dashboard/user',
    icon: 'user',
    label: 'user',
    disabled: true
  },
  {
    title: 'Plano Homologação',
    href: '/dashboard/planohmg',
    icon: 'post',
    label: 'post',
    disabled: true
  }, */
  /*   {
    title: 'Employee',
    href: '/dashboard/employee',
    icon: 'employee',
    label: 'employee'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Kanban',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'kanban'
  }, */
  {
    title: 'Administração',
    href: '/dashboard/administracao',
    icon: 'settings',
    label: 'administracao'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
