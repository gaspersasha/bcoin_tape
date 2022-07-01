import React from 'react';
import { useSelector } from 'react-redux';
import ReactTicker from 'react-ticker'


const Ticker = () => {

    const { lastGameWinners } = useSelector(state => state.game);

    if (!lastGameWinners.length) return <div className='ticker-container'/>;


    return (
        <div className='ticker-container'>
            <ReactTicker speed={4} style={{
                height: '18px',
            }}>
                {({ index }) => {

                    if (index >= lastGameWinners.length) {
                       
                        index = index % lastGameWinners.length;
                    }

                    return (
                        <p style={{ whiteSpace: "nowrap", lineHeight: '18px', marginTop: '4px', }} className="ticker-text" >

                            <span className="name">{lastGameWinners[index].name}</span>
                            <span className="gain">{` wins ♦${lastGameWinners[index].gain} `}&nbsp;&nbsp;&nbsp;</span>

                        </p>
                    );
                }}
            </ReactTicker>
        </div>
    );
};

   

   


export default Ticker;
