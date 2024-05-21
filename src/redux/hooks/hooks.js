/**
 * permiten acceder al despachador de acciones 
 * y al selector de estado desde cualquier componente de React.
 */
import { useDispatch, useSelector } from 'react-redux';
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;


// import { useDispatch, useSelector } from 'react-redux';
// import type { TypedUseSelectorHook } from 'react-redux';
// import type { RootState, AppDispatch } from './store';

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector