import React, { useState } from 'react';
import LayoutH from '../../Components/LayoutHome'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  }
 
  return (
    <LayoutH>
      <div className="flex-grow flex items-center justify-center">
        {!isLoggedIn ? (
          <form className="w-1/3" onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-4">Inicio de sesión</h2>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium">Usuario</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 w-full border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 w-full border rounded" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Iniciar sesión</button>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Bienvenido, {username}!</h2>
            <button onClick={() => setIsLoggedIn(false)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cerrar sesión</button>
          </div>
        )}
      </div>
    </LayoutH>
  )

}

export default Login;