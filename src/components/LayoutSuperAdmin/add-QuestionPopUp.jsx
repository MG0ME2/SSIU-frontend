import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import ButtonPrimary from '../Buttons/primary';
import IconAdd from '../../assets/Img/IconAdd.svg';


const AddQuestionPopUp = ({ onClose, onSubmit }) => {
  const [questionName, setquestionName] = useState('');
  const [questioncode, setquestioncode] = useState('');
  const [questionType, setquestionType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar los datos del nuevo question
    const newquestionData = {
      name: questionName,
      code: questioncode,
      type: questionType,
    };
    console.log("Submit data:", newquestionData);
    onSubmit(newquestionData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold">Agregar nueva pregunta</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          {questionName && (
                  <label
                    htmlFor="questionName"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Ingrese la pregunta
                  </label>
                )}
            <input
              type="text"
              placeholder="Ingrese la pregunta"
              value={questionName}
              onChange={(e) => setquestionName(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
          {questionType && (
                  <label
                    htmlFor="questionType"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Elija el tipo de pregunta
                  </label>
                )}
            <input
              type="text"
              placeholder="Elija el tipo de pregunta"
              value={questionType}
              onChange={(e) => setquestionType(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
          {questioncode && (
                  <label
                    htmlFor="questioncode"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Codigo de question asociado
                  </label>
                )}
            <input
              type="text"
              placeholder="Codigo de question asociado"
              value={questioncode}
              onChange={(e) => setquestioncode(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <ButtonPrimary icono={IconAdd} title="Agregar pregunta" typeB="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestionPopUp;
