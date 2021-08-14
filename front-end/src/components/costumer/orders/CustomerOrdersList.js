import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../Loader';
import { getAllOrdersByUserApi } from '../../../redux/actions';
import OrderListInfos from './OrderListInfos';

const testId = 'customer_orders__';

class CustomerOrdersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoading: true,
    };
    this.setAllOrdersInState = this.setAllOrdersInState.bind(this);
  }

  async componentDidMount() {
    const { getAllOrdersByUser } = this.props;
    await getAllOrdersByUser();
    this.setAllOrdersInState();
  }

  setAllOrdersInState() {
    const { allOrders } = this.props;
    if (allOrders) {
      allOrders.forEach((elem) => {
        const date = elem.sale_date.split('T')[0].split('-');
        elem.sale_date = `${date[2]}/${date[1]}/${date[0]}`;
      });
      this.setState((state) => ({ ...state,
        orders: allOrders,
        isLoading: false }));
    }
  }

  render() {
    const { isLoading } = this.state;
    const { history } = this.props;
    if (isLoading) {
      return <Loader />;
    }
    const { orders } = this.state;
    return (
      <div className="customer-orders-container">
        {
          orders.map((order, i) => (
            <button
              key={ i }
              type="button"
              onClick={ () => history.push(`/customer/orders/${order.id}`) }
            >
              <div key={ i } className="order-card">
                <div className="order-left">
                  <button
                    type="button"
                    onClick={ () => history.push(`/customer/orders/${order.id}`) }
                  >
                    <span>Pedido</span>
                    <span
                      data-testid={ `${testId}-order-id-${order.id}` }
                    >
                      {order.id}
                    </span>
                  </button>
                </div>
                <div className="order-right">
                  <OrderListInfos order={ order } />
                </div>
              </div>
            </button>
          ))
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAllOrdersByUser: () => dispatch(getAllOrdersByUserApi()),
});

const mapStateToProps = (state) => ({
  allOrders: state.ordersReducer.allOrders,
});

CustomerOrdersList.propTypes = {
  history: PropTypes.shape().isRequired,
  getAllOrdersByUser: PropTypes.func.isRequired,
  allOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrdersList);
