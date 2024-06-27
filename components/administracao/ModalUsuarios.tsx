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
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { useState } from "react"

export function ModalUsuarios() {
  const [loading, setLoading]= useState(false)
  const [users, setUsers] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

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
        if (result.length > 0) {
          setColumns(Object.keys(result.user[0]));
        }
        setUsers(result);

        console.log(result);
        setLoading(false);
    } catch (error) {
        console.error("Failed to list user data", error);
        setLoading(false);
    }
};
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Usuarios</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90%] sm:max-h-[90%] h-full w-full">
        <DialogHeader>
          <DialogTitle>Editar Uusarios</DialogTitle>
          <DialogDescription>
            tela para listar usuarios cadastrados, e realizar alterções.
          </DialogDescription>
        </DialogHeader>
        <Button variant={"secondary"} className="w-36"  onClick={loadUserData}>Carregar</Button>
        <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
          <Table className="p-2">
         
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
                
            {users.map((user, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className={colIndex === columns.length - 1 ? "text-right" : ""}>
                      {user[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
               
            </TableBody>
           
          </Table>

          <ScrollBar orientation="horizontal"  />
        </ScrollArea>
        {/*    <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
