import * as ActionTypes from './actionTypes'
import ImmutabilityUtil from '../utils/ImmutabilityUtil';

const initialState = {
    stockDataMap: new Map(), // symbol => { date, high, low, open, close }[]
    fetchStockDataErrorMap: new Map(), // symbol => errorMessage
    availableSymbolMap: new Map(), // symbol => { symbol, name, sector, type }
    fetchAvailableSymbolsError: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_STOCK_DATA_SUCCESS:
            return {
                ...state,
                stockDataMap: ImmutabilityUtil.setValueInMap(state.stockDataMap, action.symbol, action.data),
            };
        case ActionTypes.FETCH_STOCK_DATA_FAILURE:
            return {
                ...state,
                fetchStockDataErrorMap: ImmutabilityUtil.setValueInMap(state.fetchStockDataErrorMap, action.symbol, action.errorMessage),
            };
        case ActionTypes.FETCH_AVAILABLE_SYMBOLS_SUCCESS:
            return {
                ...state,
                availableSymbolMap: new Map(action.symbols.map(symbolData => [symbolData.symbol, symbolData])),
            };
        case ActionTypes.FETCH_AVAILABLE_SYMBOLS_FAILURE:
            return {
                ...state,
                fetchAvailableSymbolsError: action.errorMessage,
            };
        default:
            return state;
    }
}
