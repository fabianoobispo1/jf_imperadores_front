'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { useState, useEffect } from 'react';
import { LoadingButton } from '../ui/loading-button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import axios from 'axios';
import { useSession } from 'next-auth/react';


// Definindo tipos para colunas e cabeçalhos
const columns = [
  'nome',
  'email',
  'administrador',
  'data_nascimento',
  'created_at',
  'provider'
] as const;

type ColumnKey = (typeof columns)[number];

const columnHeaders: Record<ColumnKey, string> = {
  nome: 'Nome',
  email: 'Email',
  administrador: 'Administrador',
  data_nascimento: 'Data de Nascimento',
  created_at: 'Criado em',
  provider: 'Provedor'
};

export function ModalUsuarios() {
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [editedUser, setEditedUser] = useState<{ [key: string]: any }>({});

  const { data: session } = useSession();

  const loadUserData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/usuario/listausuarios`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.tokenApi}`
          }
        }
      );

      const result = response.data.sfaUsuario;

      if (result.length > 0) {
        const firstItem = result[0];
        const keys = Object.keys(firstItem);
        console.log('Extracted Keys:', keys);
      }
      setUsers(result);
      setLoading(false);
    } catch (error) {
      console.error('Failed to list user data', error);
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    userId: string
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [name]: name === 'administrador' ? value === 'true' : value
      }
    }));
  };

  const handleSelectChange = (value: string, userId: string) => {
    console.log('Select Change:', value, 'User ID:', userId);
    setEditedUser((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        administrador: value === 'true'
      }
    }));
  };

  const saveUserData = async (userId: string) => {
    setLoadingUser(true);
    try {
      const user = editedUser[userId];
      if (!user) {
        setLoadingUser(false);
        console.error('No changes to save');
        return;
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/usuario/editarusuario/${userId}`,
       user,
        {
          headers: {
            Authorization: `Bearer ${session?.user.tokenApi}`
          }
        }
      );

      console.log(response)
      if (response.status== 200) {
        // Atualizar o usuário na lista de usuários
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === userId ? { ...u, ...user } : u))
        );
        setEditedUser((prev) => ({
          ...prev,
          [userId]: undefined
        }));
        setLoadingUser(false);
      } else {
        setLoadingUser(false);
        console.error('Failed to update user data');
      }
    } catch (error) {
      setLoadingUser(false);
      console.error('Failed to save user data', error);
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString == null) {
      return '-';
    } else {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  };

  useEffect(() => {
    console.log('Users:', users);
  }, [users]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Usuarios</Button>
      </DialogTrigger>
      <DialogContent className="h-full max-h-[90%] w-full max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Editar Usuarios</DialogTitle>
          <DialogDescription>
            Tela para listar usuários cadastrados, e realizar alterações.
          </DialogDescription>
        </DialogHeader>
        <LoadingButton
          loading={loading}
          variant={'secondary'}
          className="w-36"
          onClick={loadUserData}
        >
          Carregar
        </LoadingButton>

        <ScrollArea className="h-[calc(80vh-220px)] w-full overflow-x-auto rounded-md border">
          <Table className="w-full p-2">
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>{columnHeaders[column]}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className={
                          colIndex === columns.length - 1 ? 'text-right' : ''
                        }
                      >
                        {column === 'nome' ? (
                          user[column]
                        ) : column === 'administrador' ? (
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange(value, user.id)
                            }
                            defaultValue={String(
                              editedUser[user.id]?.administrador ??
                                user.administrador
                            )}
                          >
                            <SelectTrigger className="h-8 w-[70px]">
                              <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent side="bottom">
                              <SelectGroup>
                                <SelectItem value="true">Sim</SelectItem>
                                <SelectItem value="false">Não</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        ) : column === 'data_nascimento' ||
                          column === 'created_at' ? (
                          formatDate(user[column])
                        ) : (
                          user[column]
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <LoadingButton
                        loading={loadingUser}
                        onClick={() => saveUserData(user.id)}
                      >
                        Salvar
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    Nenhum dado disponível
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
