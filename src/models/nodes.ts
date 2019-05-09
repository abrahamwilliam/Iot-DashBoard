import { queryNodesList, queryOneNode, } from '@/services/api';

import { Model } from 'dva';

const nodesModel: Model = {
  namespace: 'nodes',

  state: {
    types: [],
    tags: [],
    list: [],
  },

  effects: {
    *fetchNodes({ payload }, { call, put }) {
      const response = yield call(queryNodesList, payload);
      yield put({
        type: 'fetch',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchOneNode({ payload }, { call, put }) {
      const response = yield call(queryOneNode, payload);
      var array = []
      array.push(response)
      yield put({
        type: 'fetch',
        payload: array,
      });
    },
    // *addNode({ payload, callback }, { call, put }) {
    //   // const response = yield call(addNode, payload);
    //   yield put({
    //     type: 'add',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *removeNode({ payload, callback }, { call, put }) {
    //   // const response = yield call(removeNode, payload);
    //   yield put({
    //     type: 'remove',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *updateNode({ payload, callback }, { call, put }) {
    //   // const response = yield call(updateNode, payload);
    //   yield put({
    //     type: 'update',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
  },

  reducers: {
    fetch: (state, action) => ({ ...state,
      list: action.payload,
      types: [...new Set(action.payload.map(item => item.type))],
      tags: [...new Set(action.payload.map(item => item.tags).flat())],
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
