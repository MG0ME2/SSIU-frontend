function DatosLaborales() {

    return (
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col justify-center">
          <input
            type="text"
            placeholder="Empresa actual"
            className="mt-1 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Dirección de la empresa"
            className="mt-1 p-2 border rounded"
          />
          <label>fecha inicial de contrato</label>
          <input
            type="date"
            placeholder="Fecha inicio del contrato"
            className="mt-1 p-2 border rounded"
          />
        </div>
        <div className="flex flex-col justify-center">
          <input
            type="text"
            placeholder="Contacto de la empresa"
            className="mt-1 p-2 border rounded "
          />
          <input
            type="text"
            placeholder="Cargo de la empresa"
            className="mt-1 p-2 border rounded"
          />
          <label>fecha final de contrato</label>
          <input
            type="date"
            placeholder="Seleccione una fecha"
            class="mt-1 p-2 border rounded w-full"
           />
        </div>
      </div>
    );
  }

export default DatosLaborales;