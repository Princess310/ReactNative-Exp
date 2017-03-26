
import type { Action } from '../actions/types';
import { YAOYUE_USER_LOGIN, YOAYUE_FETCH_MOMENT_ROLES, YAOYUE_FETCH_MOMENT_LIST, YAOYUE_FETCH_MOMENT_DETAIL,
          YAOYUE_FETCH_NEW_MOMENT_DETAIL, YAOYUE_SEARCH_MOMENT, YAOYUE_CLEAR_SEARCH_MOMENT } from '../actions/yaoyue';

const initialState = {
  access_token: "",
  user: {},
  match: {},
  moment: {
    roles: [],
    listMap: {},
    hasNextMap: {},
    detail: {},
    seachList: [],
    searchHasNext: false,
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
    case YAOYUE_FETCH_MOMENT_DETAIL:
    {
      const { moment } = state;
      const { data } = action.payload;

      return {
        ...state,
        moment: {
          ...moment,
          detail: data,
        }
      }
    }
    case YAOYUE_FETCH_NEW_MOMENT_DETAIL:
    {
      const { moment } = state;
      let { listMap } = moment;
      const { data, type } = action.payload;

      // do refresh detail for list
      for (let lmk of Object.keys(listMap)) {
        let list = listMap[lmk];

        list = list.map((m) => {
          if(m.id === data.id){
            m = data;
          }
          return m;
        });

        listMap[lmk] = list;
      }

      return {
        ...state,
        moment: {
          ...moment,
          listMap: listMap,
          detail: data,
        }
      }
    }
    case YAOYUE_SEARCH_MOMENT:
    {
      const { moment } = state;
      const { seachList } = moment;
      const { list, page } = action.payload;
      let hasNext = true;
      let newList = seachList;

      if(page.current_page === 1){
        newList = list;
      }else if(page.current_page <= page.page_count){
        newList = [...newList, ...list];
      }

      if(page.current_page >= page.page_count){
        hasNext = false;
      }

      return {
        ...state,
        moment: {
          ...moment,
          seachList: newList,
          searchHasNext: hasNext,
        }
      }
    }
    case YAOYUE_CLEAR_SEARCH_MOMENT:
    {
      const { moment } = state;
      const { seachList } = moment;

      return {
        ...state,
        moment: {
          ...moment,
          seachList: [],
          searchHasNext: false,
        }
      }
    }
  }

  return state;
}
