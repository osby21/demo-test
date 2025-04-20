<template>
    <div class="card bg-base-100 shadow-xl animate-pulse">
      <div class="h-48 bg-gray-200 rounded-t-xl"></div>
      <div class="card-body">
        <div class="h-4 bg-gray-200 mb-2 w-3/4"></div>
        <div class="h-4 bg-gray-200 mb-4 w-1/2"></div>
        <div class="h-6 bg-gray-200 w-24 rounded"></div>
      </div>
    </div>
    
  </template>
  
  <style>
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  </style>