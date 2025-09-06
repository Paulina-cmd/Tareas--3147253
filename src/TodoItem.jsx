import { useState } from 'react';

export default function TodoItem({ tarea, toggleCompleted, eliminarTarea, editarTarea }) {
  const [editando, setEditando] = useState(false);
  const [textoEditado, setTextoEditado] = useState(tarea.text);

  const handleGuardar = () => {
    if (textoEditado.trim()) {
      editarTarea(tarea.id, textoEditado);
      setEditando(false);
    }
  };

  const handleCancelar = () => {
    setTextoEditado(tarea.text);
    setEditando(false);
  };

  return (
    <div className="flex items-center gap-3 justify-between border-b border-gray-300 p-3 shadow-sm rounded">
      {editando ? (
        <input
          type="text"
          value={textoEditado}
          onChange={(e) => setTextoEditado(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && handleGuardar()}
          autoFocus
        />
      ) : (
        <span className={tarea.completed ? 'line-through text-gray-400' : 'text-black'}>
          {tarea.text}
        </span>
      )}
      
      <div className="flex items-center gap-2">
        {editando ? (
          <>
            <button
              onClick={handleGuardar}
              className="text-green-600 hover:text-green-800 text-lg"
              title="Guardar"
            >
              💾
            </button>
            <button
              onClick={handleCancelar}
              className="text-gray-600 hover:text-gray-800 text-lg"
              title="Cancelar"
            >
              ❌
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditando(true)}
              className="text-blue-500 hover:text-blue-700 text-lg"
              title="Editar"
            >
              ✏️
            </button>
            <input 
              className="w-4 h-4" 
              type="checkbox" 
              checked={tarea.completed} 
              onChange={() => toggleCompleted(tarea.id)} 
            />
            <button 
              onClick={() => eliminarTarea(tarea.id)}
              className="text-red-500 hover:text-red-700 text-lg"
              title="Eliminar"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}