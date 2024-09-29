import React from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';

export default function Loading(props) {
  return (
    <div>
      <LoadingOverlay
        active={props.loading}
        spinner
        styles={{
          wrapper: {},
          overlay: (base) => ({
            ...base,
            // marginTop: '-2% !important',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }),
          spinner: (base) => ({
            ...base,
            width: '100px',
            '& svg circle': {
              stroke: 'url(#my_gradient)', // Using the gradient defined in the SVG
            },
          }),
        }}
      >
        {/* Gradient SVG definition */}
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
      </LoadingOverlay>
    </div>
  );
}
