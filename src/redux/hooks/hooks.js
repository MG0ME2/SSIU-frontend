/**
 * permiten acceder al despachador de acciones 
 * y al selector de estado desde cualquier componente de React.
 */
import { useDispatch, useSelector } from 'react-redux';
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;