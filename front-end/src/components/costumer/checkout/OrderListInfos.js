import React from 'react';
import PropTypes from 'prop-types';

const testId = 'customer_orders__';

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
          data-testid={ `${testId}-delivery-status-${order.id}` }
        >
          { order.status }
        </div>
        <div>
          <h4
            data-testid={ `${testId}-order-date-${order.id}` }
          >
            {order.date}
          </h4>
          <h4
            data-testid={ `${testId}-card-price-${order.id}` }
          >
            { `R$ ${order.total_price.replace('.', ',')}` }
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
