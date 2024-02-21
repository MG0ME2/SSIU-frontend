// Nucleos
import { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from '../Home'
import PageUno from '../Home/page1'
import Login from '../Home/Login'
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

// Components
import ProtectedRoute from '../../Components/ProtectedRoutes';

// Context
import { AppContextProvider, AppContext } from '../../Context';

const AppRoutes = () => {

  const context = useContext(AppContext)
  console.log('context t: ',context.userToken);
  console.log('context d: ',context.userData);

  return (
    <Routes>
      {/*Home*/}
      <Route path= '/' element={<Home />}/>
      <Route path= '/1' element={<PageUno />}/>
      <Route path= '/login' element={<Login />}/>

      {/*SuperAdmin*/}
      <Route element={
        <ProtectedRoute
        isAllowed={!!context.userToken && context.userData.role.includes('spadmin')}
        redirectTo='/'
        />
      }>
        <Route path= '/superadmin' element={<SuperAdminHome />}/>
      </Route>

      {/*Admin*/}
      <Route element={
        <ProtectedRoute
        isAllowed={!!context.userToken && context.userData.role.includes('admin')}
        redirectTo='/'
        />
      }>
        <Route path= '/admin' element={<AdminHome />}/>
      </Route>

      {/*QualityInstitutional*/}
      <Route element={
        <ProtectedRoute
        isAllowed={!!context.userToken && context.userData.role.includes('quality_institutional')}
        redirectTo='/'
        />
      }>
        <Route path= '/qualityinstitutional' element={<QualityInstitutionalHome />}/>
      </Route>

      {/*QualityLeader*/}
      <Route element={
        <ProtectedRoute
        isAllowed={!!context.userToken && context.userData.role.includes('quality_leader')}
        redirectTo='/'
        />
      }>
        <Route path= '/qualityleader' element={<QualityLeaderHome />}/>
      </Route>

      {/*Teacher*/}
      <Route element={
        <ProtectedRoute
        isAllowed={!!context.userToken && context.userData.role.includes('teacher')}
        redirectTo='/'
        />
      }>
        <Route path= '/teacher' element={<TeacherHome />} />
        <Route path= '/teacher/page1' element={<Page1 />} />
        <Route path= '/teacher/page2' element={<Page2 />} />
      </Route>

      {/*Graduates*/}
      <Route element={
        <ProtectedRoute
        isAllowed={!!context.userToken && context.userData.role.includes('graduates')}
        redirectTo='/'
        />
      }>
        <Route path= '/graduates' element={<GraduatesHome />}/>
      </Route>

      {/*Employers*/}
      <Route element={
        <ProtectedRoute
        isAllowed={!!context.userToken && context.userData.role.includes('employer')}
        redirectTo='/'
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
