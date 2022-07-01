import React, { useState } from 'react';
import PropTypes from 'prop-types';

const copyToClipboard = (text) => {
  if (window.clipboardData && window.clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData("Text", text);
  }
  else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      }
      catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
      }
      finally {
          document.body.removeChild(textarea);
      }
  }
};

export const RecoveryCode = ({ code, name }) => {

  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    copyToClipboard(code);
    setCopied(true);
  };
 
  return (
    <div className="recovery">
      <div className="title"><h2>Welcome {name}, here is your <br />recovery code</h2></div>
      <div className="subtitle">Sinse we email adress is optional and we let you ti be anonymus <br /> please save your recovery code:</div>
      <div className="code">
        {code}
      </div>
      <div className="question">
        Have question? <a href="/about" target="_blank" >please visit</a>
      </div>
      <div className="actions">
        <div><button onClick={handleCopyClick}>{copied ? 'COPIED' : 'COPY CODE'}</button></div>
        {/* <div><button>CLOSE</button></div> */}
      </div>
    </div>
  )
};

RecoveryCode.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};

export default RecoveryCode;
