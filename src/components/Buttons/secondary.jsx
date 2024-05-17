import {useNavigate} from "react-router-dom";

const ButtonSecondary = ({title, icono, typeB, to}) => {
  let navigate = useNavigate();
  
  const isActive = typeB === 'button';
  
  const goEvent = () => {
    navigate(to);
  };
  
  return (
    <button
      className="flex items-center gap-2 py-2 px-4 text-sm rounded-md bg-[#28537E] text-white font-semibold hover:border-[#428BCA]  hover:text-white active:border-[#428BCA] hover:border-transparent hover:border-2 active:border-2"
      type={typeB}
      onClick={isActive ? goEvent : undefined}>
      {title}
      <img src={icono} alt={title} className="w-4 h-4"/>
    </button>
  );
};

export default ButtonSecondary;