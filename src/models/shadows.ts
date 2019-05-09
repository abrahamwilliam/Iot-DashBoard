import { queryShadowsList, queryOneShadow } from '@/services/api';

import { Model } from 'dva';

const nodesModel: Model = {
  namespace: 'shadows',

  state: {
    list: [],
  },

  effects: {
    *fetchShadows({ payload }, { call, put }) {
      const response = yield call(queryShadowsList, payload);
      yield put({
        type: 'fetch',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchOneShadow({ payload }, { call, put }) {
      const response = yield call(queryOneShadow, payload);
      var array = []
      array.push(response)
      yield put({
        type: 'fetch',
        payload: array,
      });
    },
    *updateOneShadow({ payload }, { call, put }) {
      const response = yield call(queryOneShadow, payload);
      yield put({
        type: 'update',
        payload: response
      });
    },
  },

  reducers: {
    fetch: (state, action) => ({ ...state,
      list: action.payload
    }),
    add: (state, action) => ({ ...state,
      list: state.list.concat(action.payload)
    }),
    remove: (state, action) => ({ ...state,
      list: state.list.filter(item => item.id != action.payload.id)
    }),
    update: (state, action) => ({ ...state,
      list: state.list.map(item =>
        item.id == action.payload.id ?
        { ...item, ...action.payload} : item
      )
    }),
  },
}

export default nodesModel;
