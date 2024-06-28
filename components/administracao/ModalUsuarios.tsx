'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useState } from "react"
import { LoadingButton } from "../ui/loading-button"

export function ModalUsuarios() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [editedUser, setEditedUser] = useState<{ [key: string]: any }>({});

  const loadUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/usuario/recuperalista', {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const result = await response.json();
      console.log("API Result:", result);

      if (result && Array.isArray(result)) {
        if (result.length > 0) {
          const firstItem = result[0];
          const keys = Object.keys(firstItem);
          console.log("Extracted Keys:", keys);
          setColumns(keys);
        }
        setUsers(result);
      } else if (result && result.user && Array.isArray(result.user)) {
        const userArray = result.user;
        if (userArray.length > 0) {
          const firstItem = userArray[0];
          const keys = Object.keys(firstItem);
          console.log("Extracted Keys:", keys);
          setColumns(keys);
        }
        setUsers(userArray);
      } else {
        console.error("Unexpected API response format.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to list user data", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [name]: value,
      },
    }));
  };

  const saveUserData = async (userId: string) => {
    try {
      const user = editedUser[userId];
      const response = await fetch(`/api/usuario/atualizar/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Atualizar o usuário na lista de usuários
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === userId ? { ...u, ...user } : u))
        );
        setEditedUser((prev) => ({
          ...prev,
          [userId]: undefined,
        }));
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Failed to save user data", error);
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Usuarios</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] max-h-[90%] w-full h-full">
        <DialogHeader>
          <DialogTitle>Editar Usuarios</DialogTitle>
          <DialogDescription>
            Tela para listar usuários cadastrados, e realizar alterações.
          </DialogDescription>
        </DialogHeader>
        <LoadingButton loading={loading} variant={"secondary"} className="w-36" onClick={loadUserData}>
          Carregar
        </LoadingButton>
        <ScrollArea className="h-[calc(80vh-220px)] w-full rounded-md border overflow-x-auto">
          <Table className="p-2 w-full">
            <TableHeader>
              <TableRow>
                {columns.length > 0 ? (
                  columns.map((column, index) => (
                    <TableHead key={index}>{column}</TableHead>
                  ))
                ) : (
                  <TableHead>Sem Dados</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex} className={colIndex === columns.length - 1 ? "text-right" : ""}>
                        {column === "nome" ? (
                          <Input
                          className="w-56"
                            type="text"
                            name="nome"
                            value={editedUser[user.id]?.nome || user.nome}
                            onChange={(e) => handleInputChange(e, user.id)}
                          />
                        ) : (
                          user[column]
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <Button onClick={() => saveUserData(user.id)}>Salvar</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>Nenhum dado disponível</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
