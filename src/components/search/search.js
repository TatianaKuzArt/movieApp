import React from 'react';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
import './search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    // делаем debounce функции поиска
    this.debouncedSearch = debounce(this.handleSearch.bind(this), 500);
  }

  //следим за обновлением вэлью
  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.debouncedSearch(this.state.value);
    }
  }
  //очищаем при размонтировании
  componentWillUnmount() {
    this.debouncedSearch.cancel();
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSearch(value) {
    if (this.props.onSearch) {
      this.props.onSearch(value);
    }
  }

  render() {
    return (
      <div className="search-bar">
        <Input placeholder="Type to search..." value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Search;
