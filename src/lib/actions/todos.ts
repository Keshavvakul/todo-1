'use server'

import { getCurrentUser } from '../auth'
import { prisma } from '../prisma'
import { revalidatePath } from 'next/cache'

// Force dynamic rendering for server actions
export const dynamic = 'force-dynamic'

export async function createTodo(title: string, description?: string) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: 'You must be logged in to create a todo' }
    }

    if (!title || title.trim().length === 0) {
      return { error: 'Todo title is required' }
    }

    const todo = await prisma.todo.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        userId: user.id
      }
    })

    revalidatePath('/dashboard')
    return { success: true, todo }
  } catch (error) {
    console.error('Create todo error:', error)
    return { error: 'An error occurred while creating the todo' }
  }
}

export async function deleteTodo(todoId: string) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: 'You must be logged in to delete a todo' }
    }

    // Verify the todo belongs to the current user
    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
        userId: user.id
      }
    })

    if (!todo) {
      return { error: 'Todo not found or you do not have permission to delete it' }
    }

    await prisma.todo.delete({
      where: { id: todoId }
    })

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Delete todo error:', error)
    return { error: 'An error occurred while deleting the todo' }
  }
}

export async function toggleTodoComplete(todoId: string) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: 'You must be logged in to update a todo' }
    }

    // Verify the todo belongs to the current user
    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
        userId: user.id
      }
    })

    if (!todo) {
      return { error: 'Todo not found or you do not have permission to update it' }
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { completed: !todo.completed }
    })

    revalidatePath('/dashboard')
    return { success: true, todo: updatedTodo }
  } catch (error) {
    console.error('Toggle todo error:', error)
    return { error: 'An error occurred while updating the todo' }
  }
}

export async function getUserTodos() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { error: 'You must be logged in to view todos', todos: [] }
    }

    const todos = await prisma.todo.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    return { success: true, todos }
  } catch (error) {
    console.error('Get todos error:', error)
    return { error: 'An error occurred while fetching todos', todos: [] }
  }
}
