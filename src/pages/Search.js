import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSearchAction } from 'redux-search'
import debounce from 'lodash.debounce';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import * as asyncActionCreators from '../redux/thunkActionCreators';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            selectedSymbol: '',
            menuOpen: false,
        };

        this.searchForSymbols = debounce(this.searchForSymbols.bind(this), 400);
        this.symbolSearchOnFocus = this.symbolSearchOnFocus.bind(this);
        this.symbolSearchOnBlur = this.symbolSearchOnBlur.bind(this);
        this.symbolSearchOnChange = this.symbolSearchOnChange.bind(this);
        this.onSearchResults = this.onSearchResults.bind(this);
        this.symbolOnSelected = this.symbolOnSelected.bind(this);
    }

    componentDidMount() {
        const {
            availableSymbolMap,
            asyncActions,
        } = this.props;

        if (availableSymbolMap.size === 0) {
            asyncActions.fetchAvailableSymbols();
        }
    }

    symbolOnSelected(symbol) {
        this.setState({
            selectedSymbol: symbol,
        }, () => {
            this.props.history.push(`/symbol/${symbol}`);
        });
    }

    searchForSymbols(text) {
        this.props.asyncActions.searchSymbols(text);
    }

    onSearchResults(event) {
        const {
            results,
        } = event.data;

        this.setState({
            results,
        });
    }

    symbolSearchOnBlur(event) {
        this.setState({ menuOpen: false });
    }

    symbolSearchOnFocus(event) {
        this.setState({
            menuOpen: true,
        });
    }

    symbolSearchOnChange(event) {
        const query = event.target.value;

        if (this.state.query !== query) {
            this.setState({
                query: query,
            });

            this.searchForSymbols(query);
        }
    }

    render() {
        const {
            availableSymbolMap,
            fetchAvailableSymbolsError,
            search,
        } = this.props;

        if (fetchAvailableSymbolsError) {
            return (
                <div>{fetchAvailableSymbolsError}</div>
            );
        }

        if (availableSymbolMap.size === 0) {
            return (
                <div>Loading symbols...</div>
            );
        }

        return (
            <div>
                <TextField
                    onFocus={this.symbolSearchOnFocus}
                    onBlur={this.symbolSearchOnBlur}
                    label="Symbol search"
                    type="search"
                    value={this.state.query}
                    onChange={this.symbolSearchOnChange}
                    margin="normal"
                    fullWidth={true}
                />
                    {search.isSearching &&
                        <div>Searching...</div>
                    }
                    {!search.isSearching && search.result.length === 0 && this.state.query !== '' &&
                        <div>No results...</div>
                    }
                    {!search.isSearching && this.state.query === '' &&
                        <div>Start typing to search by symbol or full name</div>
                    }
                    {!search.isSearching && this.state.query !== '' && search.result.slice(0, 20).map(symbol => {
                        const symbolData = availableSymbolMap.get(symbol)
                        return (
                            <MenuItem
                                key={symbol}
                                selected={symbol === this.state.selectedSymbol}
                                onClick={() => this.symbolOnSelected(symbol)}
                            >
                                {`${symbolData.symbol} - ${symbolData.name}`}
                            </MenuItem>
                        );
                    })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        availableSymbolMap: state.main.availableSymbolMap,
        fetchAvailableSymbolsError: state.main.fetchAvailableSymbolsError,
        search: state.search.availableSymbolMap,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        asyncActions: {
            ...bindActionCreators(asyncActionCreators, dispatch),
            searchSymbols: (text) => dispatch(createSearchAction('availableSymbolMap')(text)),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);