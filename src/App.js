import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as asyncActionCreators from './redux/thunkActionCreators';
import Graph from './components/Graph';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            symbol: '',
        };

        this.symbolOnChange = this.symbolOnChange.bind(this);
        this.fetchStockData = this.fetchStockData.bind(this);
    }

    symbolOnChange(event) {
        this.setState({
            symbol: event.target.value,
        });
    }

    fetchStockData() {
        this.props.asyncActions.fetchStockData(this.state.symbol);
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.symbol}
                    onChange={this.symbolOnChange}
                />
                <button
                    type="button"
                    onClick={this.fetchStockData}
                >
                    Fetch
                </button>
                {this.props.stockDataMap.get(this.state.symbol) ? <Graph data={this.props.stockDataMap.get(this.state.symbol)} /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedsymbol: state.selectedsymbol,
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