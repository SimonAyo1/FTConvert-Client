import React from 'react';
import { useSelector } from 'react-redux';
import FTCStepper from './stepper';
import './wallet.css';



export default function Wallet() {
   const user = useSelector((state) => state.user.user);
   

  return (
    <>
      <div className="container">
        <div className="wallet" style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          {/* <aside className="left-wallet">
            <div className="wallet-head">
              <h1> My Wallets </h1>
              <div className="modal-open">+</div>
            </div>
            <div className="cc-select">
              <span>0x8028907142261fb978...</span>
            </div>
            <div className="cc-select">
              <span>0x05g8967142261fb23x...</span>
            </div>
            <div className="cc-select">
              <span>0x83239992h32261fb9ss...</span>
            </div>
          </aside> */}
          <content className="right-trans">
            <h1> Current Balance </h1>
            <h4 id="balance">${user.balance}</h4>
            <div style={{ marginTop: 50 }}>
              <FTCStepper />
            </div>
          </content>
        </div>
      </div>
    </>
  );
}
