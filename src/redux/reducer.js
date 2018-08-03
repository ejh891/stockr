import * as ActionTypes from './actionTypes'
import ImmutabilityUtil from '../utils/ImmutabilityUtil';

const initialState = {
    stockDataMap: new Map(), // ticker => { date, high, low, open, close }[]
    fetchStockDataErrorMap: new Map(), // ticker => errorMessage
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_STOCK_DATA_SUCCESS:
            return {
                ...state,
                stockDataMap: ImmutabilityUtil.setValueInMap(state.stockDataMap, action.ticker, action.data),
            };
        case ActionTypes.FETCH_STOCK_DATA_FAILURE:
            return {
                ...state,
                fetchStockDataErrorMap: ImmutabilityUtil.setValueInMap(state.fetchStockDataErrorMap, action.ticker, action.errorMessage),
            };
        default:
            return state;
    }
}
