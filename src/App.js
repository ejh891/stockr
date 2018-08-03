import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as asyncActionCreators from './redux/thunkActionCreators';
import Graph from './components/Graph';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ticker: '',
        };

        this.tickerOnChange = this.tickerOnChange.bind(this);
        this.fetchStockData = this.fetchStockData.bind(this);
    }

    tickerOnChange(event) {
        this.setState({
            ticker: event.target.value,
        });
    }

    fetchStockData() {
        this.props.asyncActions.fetchStockData(this.state.ticker);
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.ticker}
                    onChange={this.tickerOnChange}
                />
                <button
                    type="button"
                    onClick={this.fetchStockData}
                >
                    Fetch
                </button>
                {this.props.stockDataMap.get(this.state.ticker) ? <Graph data={this.props.stockDataMap.get(this.state.ticker)} /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedTicker: state.selectedTicker,
        stockDataMap: state.stockDataMap,
        fetchStockDataErrorMap: state.fetchStockDataErrorMap,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      asyncActions: bindActionCreators(asyncActionCreators, dispatch),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);