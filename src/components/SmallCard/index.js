import React, { useContext } from 'react';
import Context from '../../Context';

const SmallCard = () => {
  const { contract, wallet }= useContext(Context);
  console.log('contract', contract, 'wallet', wallet);
  return (
    <div style={{
      backgroundColor: 'green',
      height: 100,
    }}>
    </div>
  )
}

export default SmallCard;
