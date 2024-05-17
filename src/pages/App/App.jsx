// Nucleos
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Pages Home
import {Home, PageUno, SignUpForm, Login} from '../Home/index';
/// Teachers
import {TeacherPerfil, TeacherHome, Page1, Page2} from '../Teachers/index';
/// Employers
import {EmployersPerfil, EmployersHome} from '../Employers/index';
/// Graduates
import {GraduatesPerfil, GraduatesHome} from '../Graduates/index';
/// QualityInstitutional
import {QuialityInstitucionaPerfil, QualityInstitutionalHome} from '../QualityInstitutional/index';
/// QualityLeader
import {QualityLeaderPerfil, QualityLeaderHome} from '../QualityLeader/index';
/// SuperAdmin
import {SuperAdminPerfil, SuperAdminHome} from '../SuperAdmin/index';
/// Admin
import {AdminPerfil, AdminHome} from '../Admin/index';

// Styles
import './App.css'

// components
import ProtectedRoute from '../../components/ProtectedRoutes/index';

// Context

const AppRoutes = () => {
  
  return (
    <Routes>
      {/*Home*/}
      <Route path='/' element={<Home/>}/>
      <Route path='/1' element={<PageUno/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUpForm/>}/>
      
      {/*SuperAdmin*/}
      <Route element={
        <ProtectedRoute
          role='superadmin' redirectTo='/'
        />
      }>
        <Route path='/superadmin' element={<SuperAdminHome/>}/>
        <Route path='/superadmin/perfil' element={<SuperAdminPerfil/>}/>
      </Route>
      
      {/*Admin*/}
      <Route element={
        <ProtectedRoute
          role='admin' redirectTo='/'
        />
      }>
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/admin/perfil' element={<AdminPerfil/>}/>
      </Route>
      
      {/*QualityInstitutional*/}
      <Route element={
        <ProtectedRoute
          role='qualityinstitutional' redirectTo='/'
        />
      }>
        <Route path='/qualityinstitutional' element={<QualityInstitutionalHome/>}/>
        <Route path='/qualityinstitutional/perfil' element={<QuialityInstitucionaPerfil/>}/>
      </Route>
      
      {/*QualityLeader*/}
      <Route element={
        <ProtectedRoute
          role='qualityleader' redirectTo='/'
        />
      }>
        <Route path='/qualityleader' element={<QualityLeaderHome/>}/>
        <Route path='/qualityleader/perfil' element={<QualityLeaderPerfil/>}/>
      </Route>
      
      {/*Teacher*/}
      <Route element={
        <ProtectedRoute
          role='teacher' redirectTo='/'
        />
      }>
        <Route path='/teacher' element={<TeacherHome/>}/>
        <Route path='/teacher/perfil' element={<TeacherPerfil/>}/>
        <Route path='/teacher/page1' element={<Page1/>}/>
        <Route path='/teacher/page2' element={<Page2/>}/>
      </Route>
      
      {/*Graduates */}
      <Route element={
        <ProtectedRoute
          role='graduate' redirectTo='/'
        />
      }>
        <Route path='/graduate' element={<GraduatesHome/>}/>
        <Route path='/graduate/perfil' element={<GraduatesPerfil/>}/>
      </Route>
      
      
      {/*Employers*/}
      <Route element={
        <ProtectedRoute
          role='employer' redirectTo='/'
        />
      }>
        <Route path='/employer' element={<EmployersHome/>}/>
        <Route path='/employer/perfil' element={<EmployersPerfil/>}/>
      </Route>
    </Routes>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
