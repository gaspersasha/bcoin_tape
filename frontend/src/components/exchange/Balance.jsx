import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@components';

export const Balance = ({ onClose }) => {


  const wallet = '1JMcNNwQeNoFNeVPDUKmX5oFF8mqo6j3Nx';

  return (
    <Modal onClose={onClose}>
      <div className="balance">
        <div className="title"><h2>Buy crystals to play!</h2></div>
        <div className="subtitle">Please send desired amount bitcons to the address below <br/>and click "Get crystals"</div>
        <div className="rate">The exchange rate is 1 &#9830; = 0.001 BTC</div>
        <div className="buy">Dont have BTC here is link <a href="buy">to buy ealsily</a></div>
        <div className="thanks">
          +300 Crystals were successfuly sent to your account. Enjoy playing :)
        </div>
        <div className="wallet">
          {wallet}
        </div>
        <div className="processing">
          We are processing your request...
        </div>
        <div className="actions">
          <div><button>GET CRYSTALS </button></div>
          <div><button>GET NEW WALLET </button></div>
          <div><button>Please wait! <br/> Seems like transactions did not finish. <br/> Please wait and try again in 15 min.</button></div>
        </div>
        <div className="question">
          Have question? <a href="/about" target="_blank" >please visit</a>
        </div>
      </div>
    </Modal>
  )
};

Balance.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Balance;