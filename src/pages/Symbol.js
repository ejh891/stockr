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
import SearchIcon from '@material-ui/icons/Search';
import DatePicker from 'material-ui-pickers/DatePicker';
import { Container, Row, Col } from 'react-grid-system';
import moment from 'moment';

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
                startDate: moment(stockData[0].date),
                endDate: moment(stockData[stockData.length - 1].date),
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

        const minDate = moment(stockData[0].date);
        const maxDate = moment(stockData[stockData.length - 1].date);

        const trimmedData = stockData.filter(datum => {
            const datumDate = moment(datum.date);

            return datumDate >= startDate && datumDate <= endDate;
        });

        const startPrice = trimmedData[0].close;
        const endPrice = trimmedData[trimmedData.length - 1].close;

        const percentChange = (((endPrice - startPrice) / (endPrice + startPrice)) * 100).toFixed(2);

        return (
            <Container fluid={true}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={() => this.props.history.push('/')}
                            color="inherit"
                        >
                            <SearchIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit">{symbol}</Typography>
                    </Toolbar>
                </AppBar>
                <Row>
                    <Col xs={12}>
                        <Graph data={trimmedData} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} sm={5} md={4} lg={3}>
                        <div
                            style={{
                                marginTop: 20,

                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
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
                    </Col>
                    <Col xs={4} sm={3} md={2} lg={1}>
                        <div
                            style={{
                                marginTop: 20,

                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: '1.1em',
                                }}
                            >
                                {`$${startPrice}`}
                            </Typography>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} sm={5} md={4} lg={3}>
                        <div
                            style={{
                                marginTop: 20,

                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <DatePicker
                                autoOk={true}
                                format="YYYY/MM/DD"
                                minDate={startDate}
                                maxDate={maxDate}
                                label="End date"
                                value={this.state.endDate}
                                onChange={this.endDateOnChange}
                            />
                        </div>
                    </Col>
                    <Col xs={4} sm={3} md={2} lg={1}>
                        <div
                            style={{
                                marginTop: 20,

                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: '1.1em',
                                }}
                            >
                                {`$${endPrice}`}
                            </Typography>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} sm={5} md={4} lg={3}>
                        <div
                            style={{
                                marginTop: 20,

                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: '1.1em',
                                }}
                            >
                                {`Change over ${moment.duration(endDate - startDate).humanize()}:`}
                            </Typography>
                        </div>
                    </Col>
                    <Col xs={4} sm={3} md={2} lg={1}>
                        <div
                            style={{
                                marginTop: 20,

                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                style={{
                                    color: percentChange > 0 ? 'green' : 'red',
                                    fontSize: '1.1em',
                                }}
                            >
                                {`${percentChange > 0 ? '+' : ''}${percentChange}%`}
                            </Typography>
                        </div>
                    </Col>
                </Row>
            </Container>
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
