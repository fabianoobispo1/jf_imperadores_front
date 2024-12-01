/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Trash } from 'lucide-react'
import axios from 'axios'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'

import { LoadingButton } from './ui/loading-button'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Spinner } from './ui/spinner'

interface Todo {
  id: string
  text: string
  isCompleted: boolean
  created_at: string
  updated_at: string
  sfaUser_id: string
  sfaUser?: {
    nome: string
  }
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingInicial, setLoadingInicial] = useState<boolean>(true)
  const [loadingTodo, setLoadingTodo] = useState<boolean>(false)

  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    setLoadingInicial(false)
  }

  const addTodo = async () => {
    setLoading(true)
    if (newTodo.trim() === '') {
      setLoading(false)
      return
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/todo/registrartodosusuario`,
      {
        text: newTodo,
      },
      {
        headers: {
          Authorization: `Bearer xxx`,
        },
      },
    )

    const todo = response.data.sfaTodo
    setTodos([...todos, todo])
    setNewTodo('')
    setLoading(false)
  }

  const toggleTodo = async (id: string) => {
    setLoadingTodo(true)
    const todo = todos.find((todo) => todo.id === id)
    if (!todo) {
      setLoadingTodo(false)
      return
    }

    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted }

    await axios.put(
      `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/todo/editartodosusuario/${id}`,
      {
        text: todo.text,
        isCompleted: !todo.isCompleted,
      },
      {
        headers: {
          Authorization: `Bearer xxx`,
        },
      },
    )

    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)))
    setLoadingTodo(false)
  }

  const removeTodo = async (id: string) => {
    setLoadingTodo(true)
    const todo = todos.find((todo) => todo.id === id)
    if (!todo) {
      setLoadingTodo(false)
      return
    }

    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/todo/deletetodosusuario/${id}`,

      {
        headers: {
          Authorization: `Bearer xxx`,
        },
      },
    )

    loadTodos()
    setLoadingTodo(false)
  }

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
        {loadingInicial ? (
          <div className="flex h-[calc(80vh-220px)] items-center justify-center ">
            <Spinner />
          </div>
        ) : (
          <Table className="relative">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Sugestão</TableHead>
                <TableHead className="text-center">Completou</TableHead>
                <TableHead className="text-center">Criado em</TableHead>
                {/* <TableHead className="text-center">Criado por</TableHead> */}
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
                  {/*  <TableCell className="text-center">
                    {todo.sfaUser?.nome || 'Desconhecido'}
                  </TableCell> */}
                  <TableCell className="flex items-center justify-center gap-2">
                    <LoadingButton
                      className="w-32"
                      loading={loadingTodo}
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.isCompleted ? 'Desfazer' : 'Completo'}
                    </LoadingButton>
                    <LoadingButton
                      loading={loadingTodo}
                      variant={'destructive'}
                      onClick={() => removeTodo(todo.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
