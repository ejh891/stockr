import * as ActionCreators from './actionCreators';
import StockDetailsService from '../services/StockDetailsService';

export function fetchStockData(symbol) {
  return async (dispatch) => {
    try {
      const stockData = await StockDetailsService.getStockDetails(symbol);

      dispatch(ActionCreators.fetchStockDataSuccess(symbol, stockData));
    } catch (error) {
      dispatch(ActionCreators.fetchStockDataFailure(symbol, error.message));
    }
  };
}

export function fetchAvailableSymbols() {
  return async (dispatch) => {
    try {
      const symbols = await StockDetailsService.getAvailableSymbols();

      dispatch(ActionCreators.fetchAvailableSymbolsSuccess(symbols));
    } catch (error) {
      dispatch(ActionCreators.fetchAvailableSymbolsFailure(error.message));
    }
  };
}
