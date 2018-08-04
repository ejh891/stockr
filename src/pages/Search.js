import React, { Component } from 'react';
import { connect } from 'react-redux';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            symbol: '',
        };

        this.symbolOnChange = this.symbolOnChange.bind(this);
        this.searchOnClick = this.searchOnClick.bind(this);
    }

    symbolOnChange(event) {
        this.setState({
            symbol: event.target.value,
        });
    }

    searchOnClick() {
        this.props.history.push(`/symbol/${this.state.symbol}`);
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
                    onClick={this.searchOnClick}
                >
                    Search
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Search);