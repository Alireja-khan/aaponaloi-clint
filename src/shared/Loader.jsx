import React from 'react';
import { HashLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <HashLoader color="#36d7b7" size={60} />
    </div>
  );
};

export default Loader;
