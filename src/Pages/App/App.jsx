// Nucleos
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from '../Home'
import PageUno from '../Home/page1'
import Login from '../Home/Login'
import SignUpForm from '../Home/SignUp'
/// Teachers
import TeacherHome from '../Teachers';
import Page1 from '../Teachers/page1';
import Page2 from '../Teachers/page2';
/// Employers
import EmployersHome from '../Employers';
/// Graduates
import GraduatesHome from '../Graduates';
import GraduatesPerfil from '../Graduates/Perfil'
/// QualityInstitutional
import QualityInstitutionalHome from '../QualityInstitutional';
/// QualityLeader
import QualityLeaderHome from '../QualityLeader';
/// SuperAdmin
import SuperAdminHome from '../SuperAdmin';
/// Admin
import AdminHome from '../Admin';

// Styles
import './App.css'

// Components
import ProtectedRoute from '../../Components/ProtectedRoutes';

// Context
import { AppContextProvider } from '../../Context';

//hooks

const AppRoutes = () => {
  let roleUser =  'defaul';
  if (window.localStorage.getItem('data') !== null ){
    roleUser = JSON.parse(window.localStorage.getItem('data')).role
  }

  return (
    <Routes>
      {/*Home*/}
      <Route path= '/' element={<Home />}/>
      <Route path= '/1' element={<PageUno />}/>
      <Route path= '/login' element={<Login />}/>
      <Route path= '/signup' element={<SignUpForm />}/>

      {/*SuperAdmin*/}
      <Route element={
        <ProtectedRoute
        role='superadmin' redirectTo='/'
        />
      }>
        <Route path= '/superadmin' element={<SuperAdminHome />}/>
      </Route>

      {/*Admin*/}
      <Route element={
        <ProtectedRoute
        role='admin' redirectTo='/'
        />
      }>
        <Route path= '/admin' element={<AdminHome />}/>
      </Route>

      {/*QualityInstitutional*/}
      <Route element={
        <ProtectedRoute
        role='qualityinstitutional' redirectTo='/'
        />
      }>
        <Route path= '/qualityinstitutional' element={<QualityInstitutionalHome />}/>
      </Route>

      {/*QualityLeader*/}
      <Route element={
        <ProtectedRoute
        role='qualityleader' redirectTo='/'
        />
      }>
        <Route path= '/qualityleader' element={<QualityLeaderHome />}/>
      </Route>

      {/*Teacher*/}
      <Route element={
        <ProtectedRoute        
        role='teacher' redirectTo='/'
        />
      }>
        <Route path= '/teacher' element={<TeacherHome />} />
        <Route path= '/teacher/page1' element={<Page1 />} />
        <Route path= '/teacher/page2' element={<Page2 />} />
      </Route>

      {/*Graduates
      <Route element={
        <ProtectedRoute
        role='graduates' redirectTo='/'
        />
      }>
        <Route path= '/graduates' element={<GraduatesHome />}/>
      </Route>*/}<Route path= '/graduates' element={<GraduatesHome />}/>
      <Route path= '/graduates/Perfil' element={<GraduatesPerfil />}/>

      {/*Employers*/}
      <Route element={
        <ProtectedRoute
        role='employers' redirectTo='/'
        />
      }>
        <Route path= '/employers' element={<EmployersHome />}/>
      </Route>
    </Routes>
  )
}

const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppContextProvider>
  )
}

export default App
