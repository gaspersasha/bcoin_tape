import React, { useState, useEffect } from 'react';

export const ChangeLang = () => {

  const [lang, letLang] = useState('eng');

  const setActLang = (lang) => {
    letLang(lang);
  }

  return (
    <div className="change-lang">
       <select className="langs" onChange={setActLang}>
        <option value="Option 1">🇬🇧</option>
        <option value="Option 2">🇷🇺</option>
        <option value="Option 3">🇪🇸</option>
      </select>
    </div>
   
  )
};

export default ChangeLang;