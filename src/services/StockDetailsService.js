export default class StockDetailsService {
    static async getStockDetails(ticker) {
        const data = await new Promise(resolve => {
            const data = [
                { date: '2018-07-01', high: 10, low: 5, open: 6, close: 7 },
                { date: '2018-07-02', high: 9, low: 4, open: 7, close: 5 },
                { date: '2018-07-03', high: 10, low: 5, open: 5, close: 7 },
                { date: '2018-07-04', high: 10, low: 6, open: 7, close: 9 },
                { date: '2018-07-05', high: 12, low: 9, open: 9, close: 12 },
                { date: '2018-07-06', high: 19, low: 10, open: 12, close: 18 },
                { date: '2018-07-07', high: 30, low: 17, open: 18, close: 30 },
            ];

            setTimeout(resolve(data), 2000);
        });

        return data;
    }
}
