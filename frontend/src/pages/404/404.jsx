import React from 'react'

export const NotFoundPage = () => {

  if (window.location.pathname !== '/404') {
    window.location = '/404';
  }

  return (
    <div className="not-found-page">
      <h1>404, PAGE NOT FOUND</h1>
    </div>
  )
};

export default NotFoundPage;