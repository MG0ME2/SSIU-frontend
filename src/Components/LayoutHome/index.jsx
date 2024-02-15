const LayoutH = ({ children }) => {
    return (
        <div className="flex h-screen">
          <div className="bg-gray-800 text-white w-1/4 p-8">
            <h1 className="text-2xl font-bold mb-8">Menú</h1>
            <ul>
              <li className="mb-4">Opción 1</li>
              <li className="mb-4">Opción 2</li>
              <li className="mb-4">Opción 3</li>
            </ul>
          </div>    
          {children}
        </div>
      )
  }
  
  export default LayoutH