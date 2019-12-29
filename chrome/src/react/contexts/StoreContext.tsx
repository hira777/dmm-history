import React, { useReducer } from 'react';

import createCtx from '@/react/contexts/createCtx';
import { State, Actions, initialState, reducer } from '@/react/store/reducer';

const [useStoreContext, StoreContext] = createCtx<State>();
const [useStoreDispatchContext, StoreDispatchContext] = createCtx<
  React.Dispatch<Actions>
>();

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

export { useStoreContext, useStoreDispatchContext, StoreContextProvider };
