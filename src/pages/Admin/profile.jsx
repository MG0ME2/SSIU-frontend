import LayoutAdmin from '../../components/LayoutAdmin/index.jsx';
import LayoutPerfilTeacher from '../../components/LayoutPerfil/profileTeacher.jsx';

function AdminPerfil() {
  
  return (
    <LayoutAdmin>
      <LayoutPerfilTeacher></LayoutPerfilTeacher>
    </LayoutAdmin>
  );
}

export default AdminPerfil;