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
import DatePicker from 'material-ui-pickers/DatePicker';

import Graph from '../components/Graph';

import * as asyncActionCreators from '../redux/thunkActionCreators';

class Symbol extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date('1970-01-01'),
            endDate: new Date(),
        };

        this.startDateOnChange = this.startDateOnChange.bind(this);
        this.endDateOnChange = this.endDateOnChange.bind(this);
    }

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
            return;
        }
    }

    componentDidUpdate(prevProps) {
        const {
            match,
            stockDataMap,
        } = this.props;

        const {
            stockDataMap: prevStockDataMap,
        } = prevProps;

        const { symbol } = match.params;

        if (!prevStockDataMap.get(symbol) && stockDataMap.get(symbol)) {
            const stockData = stockDataMap.get(symbol);

            this.setState({
                startDate: new Date(stockData[0].date),
                endDate: new Date(stockData[stockData.length - 1].date),
            });
        }
    }

    startDateOnChange(startDate) {
        this.setState({
            startDate,
        });
    }

    endDateOnChange(endDate) {
        this.setState({
            endDate,
        });
    }

    render() {
        const {
            match,
            stockDataMap,
            fetchStockDataErrorMap,
        } = this.props;

        const {
            startDate,
            endDate,
        } = this.state;

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

        const minDate = new Date(stockData[0].date);
        const maxDate = new Date(stockData[stockData.length - 1].date);

        const trimmedData = stockData.filter(datum => {
            const datumDate = new Date(datum.date);

            return datumDate >= startDate && datumDate <= endDate;
        });

        const startPrice = trimmedData[0].close;
        const endPrice = trimmedData[trimmedData.length - 1].close;

        const percentChange = (((endPrice - startPrice) / (endPrice + startPrice)) * 100).toFixed(2);

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
                <Graph data={trimmedData} />
                <div>
                    <DatePicker
                        autoOk={true}
                        format="YYYY/MM/DD"
                        label="Start date"
                        minDate={minDate}
                        maxDate={endDate}
                        value={this.state.startDate}
                        onChange={this.startDateOnChange}
                    />
                </div>
                <div
                    style={{
                        marginTop: 20,
                    }}
                >
                    <DatePicker
                        autoOk={true}
                        format="YYYY/MM/DD"
                        minDate={startDate}
                        maxDate={maxDate}
                        label="End date"
                        value={this.state.endDate || new Date(stockData[stockData.length - 1].date)}
                        onChange={this.endDateOnChange}
                    />
                </div>
                <Typography
                    variant="headline"
                    style={{
                        marginTop: 20,
                    }}
                >
                    <span>Change over this period:</span>
                    <span
                        style={{
                            marginLeft: 4,
                            color: percentChange > 0 ? 'green' : 'red',
                        }}
                    >
                        {`${percentChange > 0 ? '+' : ''}${percentChange}%`}
                    </span>
                </Typography>
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
