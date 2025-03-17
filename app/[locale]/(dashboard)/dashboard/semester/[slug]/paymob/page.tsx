import React from 'react';

const page = () => {
  return (
    <div>
      <h1>Paymob test page </h1>
      {/* here should be the i frame */}

      <iframe
        style={{
          borderRadius: '20px',
        }}
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture pip"
        className="w-full h-full"
        src={`https://accept.paymob.com/api/acceptance/iframes/854528?payment_token={payment_key_obtained_previously}`}
      ></iframe>
    </div>
  );
};

export default page;
