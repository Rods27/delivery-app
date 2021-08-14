import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import OrderListInfos from './OrderListInfos';
import { getAllOrdersBySellerApi } from '../../redux/actions';

const testId = 'seller_orders__element';

class SellerOrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderDetails: {},
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

  async setAllOrdersInState() {
    const { allOrders } = this.props;
    if (allOrders) {
      allOrders.forEach((ordes) => {
        const dateArray = ordes.sale_date.split('T')[0].split('-');
        ordes.date = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
      });

      this.setState((state) => ({ ...state,
        orders: allOrders,
        isLoading: false }));
    }
  }

  render() {
    const { history } = this.props;
    const { isLoading } = this.state;
    const { orders } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <div className="orderlist-container">
        {orders && orders.map((order, i) => (
          <button
            key={ i }
            type="button"
            onClick={ () => history.push(`/seller/orders/${order.id}`) }
          >
            <div className="order-card">
              <div className="order-left">
                <span>Pedido</span>
                <span
                  data-testid={ `${testId}-order-id-${order.id}` }
                >
                  {order.id}
                </span>
              </div>
              <div className="order-right">
                <OrderListInfos order={ order } />
                <span>
                  {`${order.delivery_address}, ${order.delivery_number}`}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAllOrdersByUser: () => dispatch(getAllOrdersBySellerApi()),
});

const mapStateToProps = (state) => ({
  allOrders: state.ordersReducer.allOrders,
});

SellerOrderList.propTypes = {
  history: PropTypes.shape().isRequired,
  getAllOrdersByUser: PropTypes.func.isRequired,
  allOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerOrderList);
