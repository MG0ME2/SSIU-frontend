import LayoutAdmin from '../../components/LayoutAdmin/index.jsx';
import LayoutPerfilTeacher from '../../components/LayoutPerfil/profileTeacher.jsx';
import HomeSSIU from '../../components/LayoutAdmin/homeSsiu.jsx';

function SsiuHome() {
  
  return (
    <LayoutAdmin>
      <HomeSSIU/>
    </LayoutAdmin>
  );
}

export default SsiuHome;