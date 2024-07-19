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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileUpload from '../file-upload';
import { TryoutForm } from '../forms/tryout-form';

/* import { columns } from './columns'; */
export type Caixa = {
  totalSaida: number;
  totalSaidaPago: number;
  totalEntrada: number;
  TotalEntradaPago: number;
};

export const Tryout: React.FC = () => {
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


   


  return (
    <>
      <div className="flex items-start justify-between">
      

      <TryoutForm />

  
      
      </div>
    </>
  );
};
