import { useRoutes, BrowserRouter } from 'react-router-dom'

import Home from '../Home'
import PageUno from '../Home/page1'
import Login from '../Home/Login'
import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/1', element: <PageUno /> },
    { path: '/login', element: <Login /> },
    /*{ path: '/furnitures', element: <Home /> },
    { path: '/toys', element: <Home /> },
    { path: '/othes', element: <Home /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/*', element: <NotFound /> }, */

  ])

  return routes
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
