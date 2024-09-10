'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { LoadingButton } from './ui/loading-button';
import { Trash } from 'lucide-react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  created_at: string;
  updated_at: string;
  sfaUser_id: string;
  sfaUser?: {
    nome: string;
  };
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTodo, setLoadingTodo] = useState<boolean>(false);

  const { data: session } = useSession();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);


    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/todo/listartodosusuario`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.tokenApi}`, // Adiciona o token no header
        },
      }
    );
  
    const  todos  = await response.data.sfaTodo
    setTodos(todos);  
    setLoading(false);
  };

  const addTodo = async () => {
    setLoading(true);
    if (newTodo.trim() === '') {
      setLoading(false);
      return;
    }

    const response = await fetch('/api/todo/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo, sfaUser_id: session?.user.id })
    });

    const { todo } = await response.json();
    setTodos([...todos, todo]);
    setNewTodo('');
    setLoading(false);
  };

  const toggleTodo = async (id: string) => {
    setLoadingTodo(true);
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      setLoadingTodo(false);
      return;
    }

    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    await fetch(`/api/todo/atualizar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo)
    });

    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    setLoadingTodo(false);
  };

  const removeTodo = async (id: string) => {
    setLoadingTodo(true);
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      setLoadingTodo(false);
      return;
    }

    await fetch(`/api/todo/remover/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    loadTodos();
    setLoadingTodo(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Adicionar nova sugestão"
        />
        <LoadingButton loading={loading} onClick={addTodo} className="ml-2">
          Adicionar
        </LoadingButton>
      </div>

      <ScrollArea className="h-[calc(80vh-220px)] w-full overflow-x-auto rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Sugestão</TableHead>
              <TableHead className="text-center">Completou</TableHead>
              <TableHead className="text-center">Criado em</TableHead>
              <TableHead className="text-center">Criado por</TableHead>
              <TableHead className="text-center">Opções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.text}</TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={todo.isCompleted}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  {new Date(todo.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">{todo.sfaUser?.nome || 'Desconhecido'}</TableCell>
                <TableCell className="flex gap-2 items-center justify-center">
                  <LoadingButton
                    className="w-32"
                    loading={loadingTodo}
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.isCompleted ? 'Desfazer' : 'Completo'}
                  </LoadingButton>
                  <LoadingButton
                    loading={loadingTodo}
                    variant={"destructive"}
                    onClick={() => removeTodo(todo.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
