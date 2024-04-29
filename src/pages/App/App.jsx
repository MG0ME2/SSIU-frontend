// Nucleos
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Home, PageUno, SignUpForm, Login} from '../Home/index';
// Pages
// import Home from '../Home'
// import PageUno from '../Home/Page1'
// import Login from '../Home/Login'
// import SignUpForm from '../Home/SignUp'
/// Teachers
import TeacherHome from '../Teachers';
import Page1 from '../Teachers/page1';
import Page2 from '../Teachers/page2';
/// Employers
import EmployersHome from '../Employers';
/// Graduates
import GraduatesHome from '../Graduates';
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

// components
import ProtectedRoute from '../../components/ProtectedRoutes/index';

// Context

const AppRoutes = () => {
  
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

      {/*Graduates*/}
      <Route element={
        <ProtectedRoute
        role='graduate' redirectTo='/'
        />
      }>
        <Route path= '/graduate' element={<GraduatesHome />}/>
      </Route>

      {/*Employers*/}
      <Route element={
        <ProtectedRoute
        role='employer' redirectTo='/'
        />
      }>
        <Route path= '/employer' element={<EmployersHome />}/>
      </Route>
    </Routes>
  )
}

const App = () => {
  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  )
}

export default App
