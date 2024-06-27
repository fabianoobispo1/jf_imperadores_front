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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  }
]
export function ModalUsuarios() {
  const [loading, setLoading]= useState(false)


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
        <Button variant="default" onClick={loadUserData}>Usuarios</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90%] sm:max-h-[90%] h-full w-full">
        <DialogHeader>
          <DialogTitle>Editar Uusarios</DialogTitle>
          <DialogDescription>
            tela para listar usuarios cadastrados, e realizar alterções.
          </DialogDescription>
        </DialogHeader>
        <Button variant={"secondary"} className="w-36">Carregar</Button>
        <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
          <Table className="p-2">
         
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                  {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">01</TableCell>
                <TableCell>02</TableCell>
                <TableCell>03</TableCell>
                <TableCell className="text-right">04</TableCell>
                <TableCell className="text-right">04</TableCell>
                <TableCell className="text-right">04</TableCell>
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
