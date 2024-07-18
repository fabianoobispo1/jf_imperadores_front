'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
/* import { CellAction } from './cell-action'; */
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

/* import { columns } from './columns'; */
export type Caixa = {
  totalSaida: number;
  totalSaidaPago: number;
  totalEntrada: number;
  TotalEntradaPago: number;
};

export const Caixa: React.FC = () => {
  const router = useRouter();
  const [caixa, setCaixa] = useState<Caixa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const [totalSaida, setTotalSaida] = useState(0);
  const [totalSaidaPago, setTotalSaidaPago] = useState(0);
  const [totalEntrada, setTotalEntrada] = useState(0);
  const [TotalEntradaPago, setTotalEntradaPago] = useState(0);
  const [totalCaixa, setTotalCaixa] = useState(0);

  const fetchCaixa = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/movimentacao/listarCaixa?month=${month}&year=${year}`
      );
      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }
      const data = await response.json();
      console.log(data.caixa);

      setTotalSaida(data.caixa.totalSaida);
      setTotalSaidaPago(data.caixa.totalSaidaPago);
      setTotalEntrada(data.caixa.totalEntrada);
      setTotalEntradaPago(data.caixa.totalEntradaPago);
      setTotalCaixa(data.caixa.totalCaixa)

      console.log(caixa);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaixa();
  }, [month, year]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title="Caixa" description="...." />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/movimentacao/create`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adcionar movimentação
        </Button>
      </div>
      <Separator />

      <div className="grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Caixa
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ?
                <Skeleton className="h-5 w-[150px]" />
                :
                'R$ ' + totalCaixa.toFixed(2)
              }
            </div>
            {/*  <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
      </div>
      <Separator />

      <p className='py-2'>Totalizadores mês atual </p>
      <div className="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total entrada pago
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ?
                <Skeleton className="h-5 w-[150px]" />
                :
                'R$ ' + TotalEntradaPago.toFixed(2)
              }
            </div>
            {/*  <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total entrada a receber
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ?
                <Skeleton className="h-5 w-[150px]" />
                :
                'R$ ' + totalEntrada.toFixed(2)
              }
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total saida pago
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ?
                <Skeleton className="h-5 w-[150px]" />
                :
                'R$ ' + totalSaidaPago.toFixed(2)
              }
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total saida</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ?
                <Skeleton className="h-5 w-[150px]" />
                :
                'R$ ' + totalSaida.toFixed(2)
              }</div>
            {/*      <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p> */}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
