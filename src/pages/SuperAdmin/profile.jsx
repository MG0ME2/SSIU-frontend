/**
 * NO TIENE PERFIL?
 * 
 */

import LayoutSuperAdmin from '../../components/LayoutSuperAdmin/index.jsx';
import LayoutPerfilTeacher from '../../components/LayoutPerfil/profileTeacher.jsx';

function SuperAdminPerfil() {
  
  return (
    <LayoutSuperAdmin>
      <LayoutPerfilTeacher></LayoutPerfilTeacher>
    </LayoutSuperAdmin>
  );
}

export default SuperAdminPerfil;