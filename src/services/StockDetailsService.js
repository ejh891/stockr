export default class StockDetailsService {
    static async getStockDetails(symbol) {
        const response = await fetch(`http://steveberg.herokuapp.com/symbol/${symbol.toLowerCase()}.json`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Data for ${symbol} was not found`);
        }

        const responseJSON = response.json();

        return responseJSON.history;
    }
}
