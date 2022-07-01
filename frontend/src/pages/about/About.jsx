import React from 'react'

//handle with server for better seo

export const About = () => {

  if (window.location.pathname !== '/about') {
    window.location = '/aboutthe project';
  }

  return (
    <div className="not-found-page">
      <h1>Page about</h1>
    </div>
  )
};

export default About;