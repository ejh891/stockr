import * as ActionTypes from './actionTypes';

export function fetchStockDataSuccess(symbol, data){
    return {
        type: ActionTypes.FETCH_STOCK_DATA_SUCCESS,
        symbol,
        data,
    };
}

export function fetchStockDataFailure(symbol, errorMessage){
    return {
        type: ActionTypes.FETCH_STOCK_DATA_FAILURE,
        symbol,
        errorMessage,
    };
}

export function fetchAvailableSymbolsSuccess(symbols){
    return {
        type: ActionTypes.FETCH_AVAILABLE_SYMBOLS_SUCCESS,
        symbols,
    };
}

export function fetchAvailableSymbolsFailure(errorMessage){
    return {
        type: ActionTypes.FETCH_AVAILABLE_SYMBOLS_FAILURE,
        errorMessage,
    };
}
