import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import checkUser from '../../services/checkUser';
import { Header, Loader, CardList } from '../../components';

class Products extends React.Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  async componentDidMount() {
    const Loading = 1000;
    setTimeout(() => {
      this.setState({ loading: false });
    }, Loading);
    if (!localStorage.totalPrice) localStorage.setItem('totalPrice', 0);
  }

  render() {
    const { history } = this.props;
    const { loading } = this.state;
    checkUser(history);
    return (
      <div className="products-container">
        <Header history={ history } />
        {loading
          ? (
            <div className="loading-div">
              <Loader />
            </div>
          )
          : (
            <CardList history={ history } />
          )}
      </div>
    );
  }
}

Products.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(Products);
