import * as ActionTypes from './actionTypes';

export function fetchStockDataSuccess(ticker, data){
    return {
        type: ActionTypes.FETCH_STOCK_DATA_SUCCESS,
        ticker,
        data,
    };
}

export function fetchStockDataFailure(ticker, errorMessage){
    return {
        type: ActionTypes.FETCH_STOCK_DATA_FAILURE,
        ticker,
        errorMessage,
    };
}
