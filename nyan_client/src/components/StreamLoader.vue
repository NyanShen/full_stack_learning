<template>
    <div class="stream-loader">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
      <span>思考中...</span>
    </div>
  </template>
  
  <style scoped>
  .stream-loader {
    display: flex;
    padding: 1rem;
  }
  
  .spinner {
    animation: rotate 2s linear infinite;
    width: 20px;
    height: 20px;
  }
  
  .spinner circle {
    stroke: #666;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% { transform: rotate(360deg); }
  }
  
  @keyframes dash {
    0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
    50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
    100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
  }
  </style>
  