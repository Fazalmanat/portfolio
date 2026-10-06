import React from 'react';

export default function FlashOverlay({ active }) {
  return (
    <div className={`flash-overlay ${active ? 'go' : ''}`} id="flashOverlay" />
  );
}
