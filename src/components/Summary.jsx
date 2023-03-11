import React from 'react';

function Summary({ inflow, outflow, net }) {
  return(
    <div className='summary'>

      <div className='summary-item'>
        <p>
          Inflow: 
          <span>&#8369;</span> 
          {inflow}
        </p>
      </div>

      <div className='summary-item'>
        <p>
          Outflow: 
          <span>&#8369;</span> 
          {outflow}
        </p>
      </div>

      <div className='summary-item'>
        <p>
          Net: 
          <span>&#8369;</span> 
          {net}
        </p>
      </div>

    </div>
  );
}

export default Summary;