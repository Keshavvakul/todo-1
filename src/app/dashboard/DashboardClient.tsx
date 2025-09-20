'use client'

import { useState } from 'react'
import { createTodo, deleteTodo } from '@/lib/actions/todos'
import { logout } from '@/lib/actions/auth'

interface Todo {
  id: string
  title: string
  description: string | null
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

interface User {
  id: string
  email: string
  name: string | null
}

interface DashboardClientProps {
  user: User
  initialTodos: Todo[]
}

export default function DashboardClient({ user, initialTodos }: DashboardClientProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [newTodoDescription, setNewTodoDescription] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoTitle.trim()) return

    setIsCreating(true)
    setError('')

    try {
      const result = await createTodo(newTodoTitle, newTodoDescription || undefined)
      
      if (result.error) {
        setError(result.error)
      } else if (result.todo) {
        setTodos([result.todo, ...todos])
        setNewTodoTitle('')
        setNewTodoDescription('')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const result = await deleteTodo(todoId)
      
      if (result.error) {
        setError(result.error)
      } else {
        setTodos(todos.filter(todo => todo.id !== todoId))
      }
    } catch {
      setError('An unexpected error occurred')
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold gradient-text">
            Welcome, {user.name || user.email.split('@')[0]}!
          </h1>
          <p className="text-[#b0b0b0] mt-2">Manage your tasks in the future</p>
        </div>
        
        <button
          onClick={handleLogout}
          className="btn-neon px-6 py-3 bg-gradient-to-r from-[#ff00ff] to-[#8b5cf6] text-white font-semibold rounded-lg hover:from-[#ff00ff] hover:to-[#00ffff] transition-all duration-300 neon-glow-purple"
        >
          Logout
        </button>
      </div>

      {/* Add Todo Form */}
      <div className="glass p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#00ffff] mb-4">Add New Task</h2>
        
        <form onSubmit={handleCreateTodo} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#8b5cf6] mb-2">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className="input-futuristic w-full px-4 py-3 text-[#e0e0e0] placeholder-[#666]"
              placeholder="Enter task title"
              required
              disabled={isCreating}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#8b5cf6] mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              className="input-futuristic w-full px-4 py-3 text-[#e0e0e0] placeholder-[#666] min-h-[100px] resize-none"
              placeholder="Enter task description"
              disabled={isCreating}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isCreating || !newTodoTitle.trim()}
            className="btn-neon px-6 py-3 bg-gradient-to-r from-[#00ffff] to-[#8b5cf6] text-black font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#00ffff] hover:to-[#ff00ff] transition-all duration-300"
          >
            {isCreating ? 'Creating...' : 'Create Task'}
          </button>
        </form>
      </div>

      {/* Todos Table */}
      <div className="glass overflow-hidden">
        <div className="px-6 py-4 border-b border-[#333]">
          <h2 className="text-2xl font-semibold text-[#00ffff]">Your Tasks</h2>
          <p className="text-[#b0b0b0] text-sm mt-1">
            {todos.length} task{todos.length !== 1 ? 's' : ''} total
          </p>
        </div>

        {todos.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl text-[#8b5cf6] mb-2">No tasks yet</h3>
            <p className="text-[#b0b0b0]">Create your first task above to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-futuristic">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left">#</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Description</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Created</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, index) => (
                  <tr key={todo.id} className="border-t border-[#333]">
                    <td className="px-6 py-4 text-[#00ffff] font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${todo.completed ? 'line-through text-[#666]' : 'text-[#e0e0e0]'}`}>
                        {todo.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#b0b0b0] text-sm">
                      {todo.description || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        todo.completed 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {todo.completed ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#b0b0b0] text-sm">
                      {formatDate(todo.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="btn-neon px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
