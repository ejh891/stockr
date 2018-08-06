export default class StockDetailsService {
    // static async getStockDetails(symbol) {
    //     const response = await fetch(`http://steveberg.herokuapp.com/symbol/${symbol.toLowerCase()}.json`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //         }
    //     });

    //     if (!response.ok) {
    //         throw new Error(`Data for ${symbol} was not found`);
    //     }

    //     const responseJSON = await response.json();

    //     return responseJSON.history;
    // }

    static async getStockDetails(symbol, timePeriod = '1m') {
        const response = await fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${timePeriod}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Data for ${symbol} was not found`);
        }

        const responseJSON = await response.json();

        return responseJSON;
    }

    static async getAvailableSymbols() {
        const response = await fetch('https://api.iextrading.com/1.0/ref-data/symbols', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Unable to retrieve symbols');
        }

        const responseJSON = await response.json();

        return responseJSON.map(datum => ({
            ...datum,
            id: datum.symbol, // add an id prop to each result (necessry for searching)
        }));
    }
}
