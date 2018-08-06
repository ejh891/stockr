import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Graph from '../components/Graph';

import * as asyncActionCreators from '../redux/thunkActionCreators';

class Symbol extends Component {
    componentDidMount() {
        const {
            match,
            stockDataMap,
            asyncActions,
        } = this.props;

        const { symbol } = match.params;

        if (!symbol) {
            return;
        }

        const stockData = stockDataMap.get(symbol);

        if (!stockData) {
            asyncActions.fetchStockData(symbol);
        }
    }

    render() {
        const {
            match,
            stockDataMap,
            fetchStockDataErrorMap,
        } = this.props;

        const { symbol } = match.params;

        if (!symbol) {
            return (<Redirect to="/" />);
        }

        const fetchStockDataError = fetchStockDataErrorMap.get(symbol);

        if (fetchStockDataError) {
            return (
                <div>
                    <div>{fetchStockDataError ? fetchStockDataError : 'No data found'}</div>
                    <Link to="/">Back to search</Link>
                </div>
            )
        }

        const stockData = stockDataMap.get(symbol);

        if (!stockData) {
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
                    <Typography>{`Loading ${symbol}...`}</Typography>
                </div>
            );
        }

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={() => this.props.history.push('/')}
                            color="inherit"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit">{symbol}</Typography>
                    </Toolbar>
                </AppBar>
                <Graph data={stockData} />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        stockDataMap: state.main.stockDataMap,
        fetchStockDataErrorMap: state.main.fetchStockDataErrorMap,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        asyncActions: bindActionCreators(asyncActionCreators, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Symbol);
