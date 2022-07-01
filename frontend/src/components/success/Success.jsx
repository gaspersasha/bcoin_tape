import React from 'react';
import PropTypes from 'prop-types';

const Success = ({ message }) => (
    <div className="success"> 
        <div className="success-animation">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
        </div>
        <p className="success-message">{message}</p>
    </div>
);

Success.propTypes = {
    message: PropTypes.string
};

Success.defaultProps = {
    message: ''
};

export default Success;
