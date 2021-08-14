import React from 'react';
import PropTypes from 'prop-types';

const testId = 'seller_orders__';

class OrderListInfos extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { order } = this.props;
    return (
      <div className="status-container">
        <div
          id={ order.status }
          data-testid={ `${testId}element-delivery-status-${order.order_id}` }
        >
          { order.status }
        </div>
        <div>
          <h4
            data-testid={ `${testId}element-order-date-${order.order_id}` }
          >
            { order.sale_date }
          </h4>
          <h4
            data-testid={ `${testId}element-card-price-${order.order_id}` }
          >
            { `R$ ${order.total_price}` }
          </h4>
        </div>
      </div>
    );
  }
}

OrderListInfos.propTypes = {
  order: PropTypes.shape().isRequired,
};

export default OrderListInfos;
