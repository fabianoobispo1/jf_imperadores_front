/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Trash } from 'lucide-react'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import { useSession } from 'next-auth/react'
import { useMutation } from 'convex/react'

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
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'

interface Todo {
  _id: Id<'todo'>
  _creationTime: number
  text: string
  isCompleted: boolean
  created_at: number
  updated_at: number
  userId: Id<'user'>
}
export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  const [newTodo, setNewTodo] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingInicial, setLoadingInicial] = useState<boolean>(true)

  const [loadingTodo, setLoadingTodo] = useState<boolean>(false)

  const registerTodo = useMutation(api.todo.create)

  const { data: session } = useSession()

  useEffect(() => {
    console.log('usseEfect')
    console.log(todos)
    loadTodos()
  }, [session])

  const loadTodos = async () => {
    if (session) {
      fetchQuery(api.todo.getTodoByUser, {
        userId: session.user.id as Id<'user'>,
      }).then((result) => {
        setTodos(result)
      })
    }
  }

  const addTodo = async () => {
    setLoading(true)
    if (newTodo.trim() === '') {
      setLoading(false)
      return
    }

    if (session) {
      await registerTodo({
        userId: session.user.id as Id<'user'>,
        text: newTodo,
        isCompleted: false,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      })

      setNewTodo('')
      setLoading(false)
      loadTodos()
    }
  }

  const toggleTodo = async (id: Id<'todo'>) => {
    setLoadingTodo(true)
    console.log(id)
    /*    const todo = todos.find((todo) => todo.id === id)
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

    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo))) */
    setLoadingTodo(false)
  }

  const removeTodo = async (id: Id<'todo'>) => {
    setLoadingTodo(true)

    const response = await fetchMutation(api.todo.remove, { todoId: id })
    console.log(response.message) // "Todo removido com sucesso"

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
            {todos ? (
              todos.map((todo) => (
                <TableRow key={todo._id}>
                  <TableCell>{todo.text}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={todo.isCompleted}
                      onCheckedChange={() => toggleTodo(todo._id)}
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
                      onClick={() => toggleTodo(todo._id)}
                    >
                      {todo.isCompleted ? 'Desfazer' : 'Completo'}
                    </LoadingButton>
                    <LoadingButton
                      loading={loadingTodo}
                      variant={'destructive'}
                      onClick={() => removeTodo(todo._id)}
                    >
                      <Trash className="h-4 w-4" />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Spinner />
            )}
          </TableBody>
        </Table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
