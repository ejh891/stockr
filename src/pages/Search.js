import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as asyncActionCreators from '../redux/thunkActionCreators';

import FuzzySearchWorker from '../workers/fuzzy-search.worker';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            results: [],
        };

        this.fuzzySearchWorker = new FuzzySearchWorker();
        this.fuzzySearchWorker.addEventListener('message', this.onSearchResults);

        this.symbolOnChange = this.symbolOnChange.bind(this);
        this.onSearchResults = this.onSearchResults.bind(this);
    }

    componentDidMount() {
        const {
            availableSymbols,
            asyncActions,
        } = this.props;

        if (availableSymbols.length === 0) {
            asyncActions.fetchAvailableSymbols();
        }
    }

    onSearchResults(event) {
        const {
            results,
          } = event.data;
      
          this.setState({
            results,
          });
    }

    symbolOnChange(event) {
        const query = event.target.value;
        const { availableSymbols } = this.props;
        
        if (this.state.symbol !== query) {
            this.setState({
                symbol: query,
            });

            this.fuzzySearchWorker.postMessage({
                availableSymbols,
                query
            });
        }

        this.props.history.push(`/symbol/${option.value}`);
    }

    render() {
        const {
            availableSymbols,
            fetchAvailableSymbolsError,
        } = this.props;

        if (fetchAvailableSymbolsError) {
            return (
                <div>{fetchAvailableSymbolsError}</div>
            );
        }

        if (availableSymbols.length === 0) {
            return (
                <div>Loading symbols...</div>
            );
        }

        const options = availableSymbols.map(symbol => ({
            label: `${symbol.symbol} - ${symbol.name}`,
            value: symbol.symbol,
        }));

        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        availableSymbols: state.availableSymbols,
        fetchAvailableSymbolsError: state.fetchAvailableSymbolsError,
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        asyncActions: bindActionCreators(asyncActionCreators, dispatch),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Search);