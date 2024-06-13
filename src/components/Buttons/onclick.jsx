import {useNavigate} from "react-router-dom";

const ButtonOnclick = ({title, icono, typeB, to, onClick}) => {
  let navigate = useNavigate();
  
  //const isActive = typeB === 'button';
  
  const goEvent = (event) => {
    if (to) {
       navigate(to);
    }
    if (onClick) {
      onClick(event);
    }
  };
  
  return (
    <button
      className="flex items-center gap-2 py-2 px-4 text-sm rounded-md bg-[#357EBD] text-white hover:bg-[#428BCA] active:bg-[#357EBD] active:border-2 active:border-[#28537E] active:py-[6px] active:px-[14px]"
      type={typeB}
      onClick={goEvent}>
      {title}
      <img src={icono} alt={title} className="w-4 h-4"/>
    </button>
  );
};

export default ButtonOnclick;
