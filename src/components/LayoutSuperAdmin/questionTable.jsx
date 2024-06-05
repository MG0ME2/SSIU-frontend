import React from 'react';

const QuestionTable = ({ items, addButtonLabel, onAddClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Gestión de Preguntas</h2>
      <table className="table-auto w-full mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Pregunta</th>
            <th className="px-4 py-2">Tipo de Pregunta</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Gestión</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.question}</td>
              <td className="border px-4 py-2">{item.type}</td>
              <td className="border px-4 py-2">
                <span className={item.active ? 'text-green-500' : 'text-red-500'}>
                  {item.active ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="border px-4 py-2">
                <button className="mr-2">✏️</button>
                <button className="mr-2">❌</button>
                <button>🔍</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onAddClick} className="bg-blue-500 text-white p-2 rounded">
        {addButtonLabel}
      </button>
    </div>
  );
};

export default QuestionTable;