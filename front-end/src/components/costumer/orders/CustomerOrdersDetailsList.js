import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNameUserById } from '../../../services';
import { getAllOrdersByUserApi } from '../../../redux/actions';

const prefix1 = 'customer_order_details__element-order';
const prefix2 = 'customer_order_details__';

class CustomerOrdersDetailsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderDetails: [],
      orders: [],
      delivered: false,
    };
    this.setAllOrdersInState = this.setAllOrdersInState.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
  }

  async componentDidMount() {
    const { history, getAllOrdersByUser } = this.props;
    const orderId = history.location.pathname.split('/')[3];
    await getAllOrdersByUser();
    this.setAllOrdersInState(Number(orderId));
  }

  async setAllOrdersInState(orderId) {
    const { allOrders } = this.props;
    const actualOrder = allOrders.find((o) => o.id === orderId);
    if (actualOrder) {
      const sellerName = await getNameUserById(actualOrder.seller_id);
      allOrders.forEach((elem) => {
        const dateArray = elem.sale_date.split('T')[0].split('-');
        const date = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
        elem.sale_date = date;
      });
      const selectedOrder = allOrders.filter((elem) => elem.id === orderId);
      selectedOrder[0].sellerName = sellerName;
      const orderCart = selectedOrder[0].productId;
      this.disableButtons(actualOrder);
      orderCart.forEach((elem) => {
        elem.quantity = elem.salesProducts.quantity;
      });
      this.setState((state) => ({ ...state,
        OrderDetails: selectedOrder[0],
        isLoading: false,
        orderCart }));
    }
  }

  disableButtons(order) {
    if(order) {
      if(order.status === "Pendente") {
        this.setState({
          delivered: true,
        })
      } else {
        this.setState({
          delivered: false,
        })
      }
    }
  }

  render() {
    const { history } = this.props;
    const { OrderDetails, delivered, orderCart } = this.state;
    return (
      <div className="cust-orders_details-container">
        <table className="cust-orders_details-orders-info">
          <tr>
            <td
              id="cust-orders_details-id"
              data-testid={ `${prefix1}-details-label-order-id` }
            >
              { `Pedido ${OrderDetails.id}` }
            </td>
            <td
              id="cust-orders_details-name"
              data-testid={ `${prefix1}-details-label-seller-name` }
            >
              { `P. Vend: ${OrderDetails.sellerName}` }
            </td>
            <td
              data-testid={ `${prefix1}-details-label-order-date` }
              id="cust-orders_details-date"
            >
              { OrderDetails.sale_date }
            </td>
            <td
              id={ `${OrderDetails.status}` }
              data-testid={ `${prefix1}-details-label-delivery-status` }
            >
              { (OrderDetails.status) }
            </td>
            <td>
              <button
                disabled={ !delivered }
                type="button"
                data-testid={ `${prefix2}button-delivery-check` }
              >
                Marcar como Entregue
              </button>
            </td>
          </tr>
        </table>
        <table className="cust-orders_details-cart">
          <thead>
            <tr>
              <td>Item</td>
              <td>Descrição</td>
              <td>Quantidade</td>
              <td>Valor Unitário</td>
              <td>Sub-total</td>
            </tr>
          </thead>
          <tbody>
            { (orderCart && orderCart.length > 0)
              && orderCart.map((elem, i) => (
                <tr key={ i }>
                  <td
                    id="index-td"
                    data-testid={
                      `${prefix1}-table-item-number-${elem.id}`
                    }
                  >
                    { i + 1 }
                  </td>
                  <td
                    id="name-td"
                    data-testid={ `${prefix1}-table-name-${elem.id}` }
                  >
                    { elem.name }
                  </td>
                  <td
                    id="quantity-td"
                    data-testid={ `${prefix1}-table-quantity-${elem.id}` }
                  >
                    { elem.quantity }
                  </td>
                  <td
                    id="unitprice-td"
                    data-testid={ `${prefix1}-table-unit-price-${elem.id}` }
                  >
                    { `R$ ${elem.price.toString().replace('.', ',') }` }
                  </td>
                  <td
                    id="totalprice-td"
                    data-testid={ `${prefix1}-table-sub-total-${elem.id}` }
                  >
                    {`R$ ${(elem.price * elem.quantity)
                      .toFixed(2).replace('.', ',')}` }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <h2
          className="cust-orders_details-totalprice bottom_info"
          data-testid={ `${prefix2}element-order-total-price` }
        >
          { `R$ ${(OrderDetails.total_price)
            ? OrderDetails.total_price.replace('.', ',') : 0}` }
        </h2>
        <button
          type="button"
          className="cust-orders_details-back bottom_info"
          onClick={ () => history.push('/customer/orders') }
        >
          Back
        </button>
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

CustomerOrdersDetailsList.propTypes = {
  history: PropTypes.shape().isRequired,
  getAllOrdersByUser: PropTypes.func.isRequired,
  allOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrdersDetailsList);
