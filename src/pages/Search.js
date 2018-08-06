import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSearchAction } from 'redux-search'
import debounce from 'lodash.debounce';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import VisibilitySensor from 'react-visibility-sensor';

import * as asyncActionCreators from '../redux/thunkActionCreators';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            queuedSearchQuery: '',
            searchQueued: false,
            selectedSymbol: '',
            resultsToShow: 20,
        };

        this.searchForSymbols = debounce(this.searchForSymbols.bind(this), 400);
        this.symbolSearchOnChange = this.symbolSearchOnChange.bind(this);
        this.symbolOnSelected = this.symbolOnSelected.bind(this);
        this.loadMoreVisibilityOnChange = this.loadMoreVisibilityOnChange.bind(this);
        this.showMoreResults = this.showMoreResults.bind(this);
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

    componentDidUpdate(prevProps, prevState) {
        // if a search just finished
        if (prevProps.search.isSearching && !this.props.search.isSearching) {
            // if that search is for the current query; show it, otherwise a new search is queued
            if (this.props.search.text === this.state.query) {
                this.setState({
                    searchQueued: false,
                    resultsToShow: 20,
                });
            }
        }
    }

    showMoreResults() {
        if (this.state.resultsToShow < this.props.search.result.length) {
            this.setState(prevState => ({
                resultsToShow: prevState.resultsToShow + 20,
            }));
        }

        // keep loading more results, until we cancel the timer (when the bottom of the list is out of view)
        this.loadMoreTimer = setTimeout(this.showMoreResults, 1000);
    }

    loadMoreVisibilityOnChange(isVisible) {
        if (isVisible) {
            this.showMoreResults();
        } else {
            clearTimeout(this.loadMoreTimer);
        }


    }

    symbolOnSelected(symbol) {
        this.setState({
            selectedSymbol: symbol,
        }, () => {
            this.props.history.push(`/symbol/${symbol}`);
        });
    }

    async searchForSymbols(query) {
        this.props.asyncActions.searchSymbols(query);
    }

    symbolSearchOnChange(event) {
        const query = event.target.value;

        if (this.state.query !== query) {
            this.setState({
                query: query,
                searchQueued: true,
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
                <div
                    style={{
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress />
                    <Typography>Loading symbols...</Typography>
                </div>
            );
        }

        const resultsPending = search.isSearching || this.state.searchQueued;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">Stockr</Typography>
                    </Toolbar>
                </AppBar>
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
                {resultsPending &&
                    <div style={{ margin: 20 }}>
                        <LinearProgress variant="query" />
                    </div>
                }
                {!resultsPending && this.state.query !== '' && search.result.length === 0 &&
                    <Typography>No results...</Typography>
                }
                {!resultsPending && this.state.query === '' &&
                    <Typography>Start typing to search by symbol or full name</Typography>
                }
                {!resultsPending && this.state.query !== '' && search.result.slice(0, this.state.resultsToShow).map(symbol => {
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
                {!resultsPending && this.state.query !== '' && this.state.resultsToShow < search.result.length &&
                    <VisibilitySensor onChange={this.loadMoreVisibilityOnChange}>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <CircularProgress />
                        </div>
                    </VisibilitySensor>
                }
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