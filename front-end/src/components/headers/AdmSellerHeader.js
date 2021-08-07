import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const admRoute = '/admin/manage';
const sellerRoute = '/seller/orders';
class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.Redirect = this.Redirect.bind(this)
  }

  componentDidMount() {
    const {
      history: {
        location: { pathname },
      },
    } = this.props;
    const button = document.querySelector('#admin_seller_button');
    button.style.boxShadow = 'inset 0 -17px 0px -14px #FFFFFF';
    button.style.backgroundColor = '#434343';
    button.style.color = '#ece8e8';
    if (pathname === '/admin/manage') {
      button.innerText = 'Gerenciar Usuários';
    }
  }

  Redirect(){
    const { history } = this.props;
    if (history.location.pathname === '/admin/manage') {
      return null;
    } else {
      history.push('/seller/orders');
    }
  }

  render() {
    const { history, dataLogin } = this.props;
    return (
      <header className="globalheader-container">
        <div className="left">
          <button
            type="button"
            id="admin_seller_button"
          >
            Pedidos
          </button>
        </div>
        <div className="right">
          <button
            type="button"
            id="username"
            onClick={ () => this.Redirect() }
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {(dataLogin || JSON.parse(localStorage.getItem('user')))
              ? `${JSON.parse(localStorage.getItem('user')).name}`
              : dataLogin.name}
          </button>
          <button
            type="button"
            id="logoff"
            onClick={ () => {
              localStorage.clear();
              history.push('/login');
            } }
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.userReducer.dataLogin,
});

Header.propTypes = {
  history: PropTypes.shape().isRequired,
  dataLogin: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(Header);
