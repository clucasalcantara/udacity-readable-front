import React from 'react'

const InfoBox = ({ getCategoryName }) => (
  <div className="message-posts-by-category">
    <small>
      All posts from category <strong className="message-posts-category-name">{getCategoryName()}</strong>
    </small>
  </div>
)

export default InfoBox
