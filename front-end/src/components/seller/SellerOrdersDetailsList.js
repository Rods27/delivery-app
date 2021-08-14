import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllOrdersBySellerApi } from '../../redux/actions';

const prefix1 = 'seller_order_details__element-order';
const prefix2 = 'seller_order_details__';

class SellerOrdersDetailsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderDetails: {},
      orders: [],
      isLoading: true,
      preparing: false,
      delivering: false,
    };
    this.setAllOrdersInState = this.setAllOrdersInState.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
  }

  async componentDidMount() {
    const NOT_MAGIC = -1;
    const { history, getAllOrdersByUser } = this.props;
    const orderId = Number(history.location.pathname.slice(NOT_MAGIC));
    await getAllOrdersByUser();
    this.setAllOrdersInState(orderId);
  }

  async setAllOrdersInState(orderId) {
    const { allOrders } = this.props;
    const actualOrder = allOrders.find((o) => o.id === orderId);
    if (actualOrder) {
      allOrders.forEach((elem) => {
        const dateArray = elem.sale_date.split('T')[0].split('-');
        const date = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
        elem.sale_date = date;
      });
      const selectedOrder = allOrders.filter((elem) => elem.id === orderId);
      const orderCart = selectedOrder[0].productId;
      orderCart.forEach((elem) => {
        elem.quantity = elem.salesProducts.quantity;
      });
      this.disableButtons(actualOrder);
      this.setState((state) => ({ ...state,
        OrderDetails: selectedOrder[0],
        orderCart }));
    }
  }

  disableButtons(order) {
    if (order) {
      if (order.status === 'Entregue') {
        this.setState({
          preparing: false,
          delivering: false,
        });
      }
      if (order.status === 'Preparando') {
        this.setState({
          preparing: false,
          delivering: true,
        });
      }
      if (order.status === 'Pendente') {
        this.setState({
          preparing: true,
          delivering: true,
        });
      }
    }
  }

  request() {
    this.setState({ isDelivered: true });
  }

  render() {
    const { history } = this.props;
    const { OrderDetails, preparing, delivering, orderCart } = this.state;
    return (
      <div className="seller-orders_details-container">
        <table className="seller-orders_details-orders-info">
          <tr>
            <td
              data-testid={ `${prefix1}-details-label-order-id` }
            >
              { `Pedido ${OrderDetails.id}` }
            </td>
            <td
              data-testid={ `${prefix1}-details-label-order-date` }
            >
              { OrderDetails.sale_date }
            </td>
            <td
              data-testid={ `${prefix1}-details-label-delivery-status` }
              id={ OrderDetails.status }
            >
              { OrderDetails.status }
            </td>
            <td>
              <button
                disabled={ !preparing }
                type="button"
                data-testid={ `${prefix2}button-preparing-check` }
                onClick={ () => this.request() }
              >
                PREPARAR PEDIDO
              </button>
            </td>
            <td>
              <button
                disabled={ !delivering }
                type="button"
                data-testid={ `${prefix2}button-dispatch-check` }
                onClick={ () => this.deliver() }
              >
                SAIU PARA ENTREGA
              </button>
            </td>
          </tr>
        </table>
        <table className="seller-orders_details-cart">
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
            && orderCart.map((product, i) => (
              <tr key={ i }>
                <td
                  id="index-td"
                  data-testid={ `${prefix1}-table-item-number-${product.id}` }
                >
                  { product.id }
                </td>
                <td
                  id="name-td"
                  className="text-left"
                  data-testid={ `${prefix1}-table-name-${product.id}` }
                >
                  { product.name }
                </td>
                <td
                  id="quantity-td"
                  data-testid={ `${prefix1}-table-quantity-${product.id}` }
                >
                  { product.quantity }
                </td>
                <td
                  id="unitprice-td"
                  data-testid={ `${prefix1}-table-unit-price-${product.id}` }
                >
                  { `R$ ${product.price.replace('.', ',')}` }
                </td>
                <td
                  id="totalprice-td"
                  data-testid={ `${prefix1}-table-sub-total-${product.id}` }
                >
                  { `R$ ${(product.price * product.quantity)
                    .toFixed(2).replace('.', ',')}` }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2
          className="seller-orders_details-totalprice bottom-info"
          data-testid={ `${prefix2}element-order-total-price` }
        >
          { `R$ ${(OrderDetails.total_price)
            ? OrderDetails.total_price.replace('.', ',') : 0}` }
        </h2>
        <button
          className="seller-orders_details-back bottom-info"
          type="button"
          onClick={ () => history.push('/seller/orders') }
        >
          Voltar
        </button>
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

SellerOrdersDetailsList.propTypes = {
  history: PropTypes.shape().isRequired,
  getAllOrdersByUser: PropTypes.func.isRequired,
  allOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerOrdersDetailsList);
