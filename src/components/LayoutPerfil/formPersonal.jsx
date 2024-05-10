import { useForm } from 'react-hook-form';
function DatosPersonales() {
    const { register } = useForm();
  
    return (
      <div className="grid grid-cols-2 gap-x-8">
          <div className="flex flex-col justify-center gap-4">
              <input
                  type="text"
                  placeholder="Traer nombre de la BD"
                  className="mt-1 p-2 border rounded"
                  disabled
              />
              <select
                  className="mt-1 p-2 border rounded w-full"
                  {...register("typeDni")}
              >
                  <optgroup label="Tipo de documento">
                      <option disabled value="">
                          Tipo de documento
                      </option>
                      <option value="T.I">Tarjeta de identidad</option>
                      <option value="C.C">Cedula de ciudadania</option>
                  </optgroup>
              </select>
              <input
                  type="text"
                  placeholder="Correo personal"
                  className="mt-1 p-2 border rounded"
              />
              <input
                  type="text"
                  placeholder="Traer nombre de la BD"
                  className="mt-1 p-2 border rounded"
                  disabled
              />
          </div>
          <div className="flex flex-col justify-center gap-4">
              <input
                  type="text"
                  placeholder="Traer apellido de la BD"
                  className="mt-1 p-2 border rounded "
                  disabled
              />
              <input
                  type="text"
                  placeholder="Numero de identificación"
                  className="mt-1 p-2 border rounded"
              />
              <input
                  type="text"
                  placeholder="Correo alternativo"
                  className="mt-1 p-2 border rounded"
              />
              <input
                  type="text"
                  placeholder="Numero de telefono"
                  className="mt-1 p-2 border rounded"
              />
          </div>
      </div>
    );
  }

export default DatosPersonales;