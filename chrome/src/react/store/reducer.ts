import { createContext } from 'react';

import { Histories } from '@/models/history';
import types from '@/react/store/actionTypes';
import * as creators from '@/react/store/actionCreators';
import { CreatorsActions } from '@/react/store/creatorsToActions';

export type State = {
  histories: Histories;
  restoredHistories: boolean;
  keywords: string[];
};
export type Actions = CreatorsActions<typeof creators>;

function initialState(injects?: Partial<State>): State {
  return {
    histories: [],
    restoredHistories: false,
    keywords: [],
    ...injects
  };
}

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case types.RESTORE_HISTORIES:
      return {
        ...state,
        ...{ histories: action.payload, restoredHistories: true }
      };
    case types.REMOVE_HISTORY:
      return {
        ...state,
        ...{
          histories: state.histories.filter(
            history => history.id !== action.payload
          )
        }
      };
    case types.KEYWORDS_UPDATE: {
      return {
        ...state,
        ...{
          keywords: action.payload.split(' ').filter(keyword => keyword !== '')
        }
      };
    }
    default:
      throw new Error();
  }
}

type StoreContext = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

const StoreContext = createContext<StoreContext>({} as StoreContext);

export { initialState, reducer, StoreContext };
