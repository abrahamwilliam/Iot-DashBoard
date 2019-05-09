import { fakeHistoryData } from '@/services/api';

import { Model } from 'dva';

const historyModel: Model = {
  namespace: 'history',

  state: {
    demoTemperature: [],
    timechartTemp: [],
    roomData: [],
    costData: [],
  },

  effects: {
    // name cannot be the same with name in reducers
    *fetch_history(_, { call, put }) {
      const response = yield call(fakeHistoryData);
      yield put({
        type: 'fetch',
        payload: response,
      });
    },
  },

  reducers: {
    fetch: (state, { payload }) => ({ 
      ...state,
      ...payload
    }),
    clear() {
      return {
        demoTemperature: [],
        timechartTemp: [],
        roomData: [],
        costData: [],
      };
    },
  },
}

export default historyModel;
