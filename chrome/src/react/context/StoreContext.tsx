import React, { createContext, useReducer } from 'react';

import createUseCtx from '@/react/context/createUseCtx';
import { State, Actions, initialState, reducer } from '@/react/store/reducer';

const StoreContext = createContext<State>({
  histories: [],
  restoredHistories: false,
  keywords: []
});
const StoreDispatchContext = createContext({} as React.Dispatch<Actions>);

export const useStoreContext = createUseCtx('StoreContext', StoreContext);
export const useStoreDispatchContext = createUseCtx(
  'StoreDispatchContext',
  StoreDispatchContext
);

const StoreContextProvider: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState());

  return (
    <StoreDispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={state}>
        {props.children}
      </StoreContext.Provider>
    </StoreDispatchContext.Provider>
  );
};

export default StoreContextProvider;
