import { useState } from 'react'
import TodoItem from './TodoItem'
import './App.css'

function App() {
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState('')

  const agregarTarea = () => {
    if (nuevaTarea.trim()) {
      const nuevaTareaObj = {
        id: Date.now(),
        text: nuevaTarea,
        completed: false
      }
      setTareas([...tareas, nuevaTareaObj])
      setNuevaTarea('')
    }
  }

  const toggleCompleted = (id) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? { ...tarea, completed: !tarea.completed } : tarea
    ))
  }

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id))
  }

  const editarTarea = (id, nuevoTexto) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? { ...tarea, text: nuevoTexto } : tarea
    ))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Lista de Tareas</h1>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Nueva tarea..."
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && agregarTarea()}
          />
          <button
            onClick={agregarTarea}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Agregar
          </button>
        </div>

        <div className="space-y-2">
          {tareas.map(tarea => (
            <TodoItem
              key={tarea.id}
              tarea={tarea}
              toggleCompleted={toggleCompleted}
              eliminarTarea={eliminarTarea}
              editarTarea={editarTarea}
            />
          ))}
          
          {tareas.length === 0 && (
            <p className="text-gray-500 text-center py-4">No hay tareas. ¡Agrega una!</p>
          )}
        </div>

        {tareas.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Total: {tareas.length} tarea(s) | 
            Completadas: {tareas.filter(t => t.completed).length} | 
            Pendientes: {tareas.filter(t => !t.completed).length}
          </div>
        )}
      </div>
    </div>
  )
}

export default App