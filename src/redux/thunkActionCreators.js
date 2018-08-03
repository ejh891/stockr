import * as ActionCreators from './actionCreators';
import StockDetailsService from '../services/StockDetailsService';

export function fetchStockData(ticker) {
    return async (dispatch) => {
      try {
        const stockData = await StockDetailsService.getStockDetails(ticker);
  
        dispatch(ActionCreators.fetchStockDataSuccess(ticker, stockData));
      } catch (error) {
        dispatch(ActionCreators.fetchStockDataFailure(ticker, error.message));
      }
    };
  }
