
import type { Action } from '../actions/types';
import { YAOYUE_USER_LOGIN, YOAYUE_FETCH_MOMENT_ROLES, YAOYUE_FETCH_MOMENT_LIST } from '../actions/yaoyue';

const initialState = {
  access_token: "",
  user: {},
  match: {},
  moment: {
    roles: [],
    listMap: {},
    hasNextMap: {},
  },
};

export default function (state = initialState, action:Action) {
  switch (action.type) {
    case YAOYUE_USER_LOGIN:
      return {
        ...state,
        access_token: action.payload.access_token,
        user: action.payload.data
      }
    case YOAYUE_FETCH_MOMENT_ROLES:
      {
        const { moment } = state;
        const roles = action.payload.list;

        return {
          ...state,
          moment: {
            ...moment,
            roles: roles,
          }
        }
      }
    case YAOYUE_FETCH_MOMENT_LIST:
      {
        const { moment } = state;
        const { role, list, page } = action.payload;
        const { listMap, hasNextMap } = moment;
        const oldList = listMap[role];
        let newList = oldList ? oldList : [];
        let hasNext = true;

        if(page.current_page === 1){
          newList = list;
        }else if(page.current_page <= page.page_count){
          newList = [...newList, ...list];
        }

        if(page.current_page >= page.page_count){
          hasNext = false;
        }

        const newListMap = {
          ...listMap,
          [role]: newList
        };
        const newHasNextMap = {
          ...hasNextMap,
          [role]: hasNext
        }

        return {
          ...state,
          moment: {
            ...moment,
            listMap: newListMap,
            hasNextMap: newHasNextMap,
          }
        }
      }
  }

  return state;
}
