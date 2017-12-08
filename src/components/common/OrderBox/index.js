import React from 'react'

const OrderBox = ({ handleSort }) => (
  <div className="order-by-box">
    <span>Order posts by:</span>
    <button className="regular-button" onClick={handleSort('timestamp')}>Data</button>
    <button className="regular-button" onClick={handleSort('voteScore')}>Score</button>
  </div>
)

export default OrderBox
