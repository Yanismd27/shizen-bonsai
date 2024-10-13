<template>
    <div class="fixed inset-0 bg-zen flex items-center justify-center z-50">
      <div class="text-center">
        <svg class="w-64 h-64" viewBox="0 0 200 200">
          <!-- Pot -->
          <path d="M60,180 Q100,160 140,180 L150,200 H50 L60,180" fill="#8B4513" />
          
          <!-- Trunk -->
          <path class="trunk" d="M100,180 Q95,140 100,100 T95,60 T105,30" stroke="#5D4037" stroke-width="8" fill="none" />
          
          <!-- Branches -->
          <path class="branch" d="M100,100 Q120,95 135,105" stroke="#5D4037" stroke-width="4" fill="none" />
          <path class="branch" d="M100,80 Q80,75 65,85" stroke="#5D4037" stroke-width="4" fill="none" />
          <path class="branch" d="M100,60 Q115,55 125,65" stroke="#5D4037" stroke-width="3" fill="none" />
          
          <!-- Leaves groups -->
          <g class="leaves leaves-1">
            <circle cx="135" cy="105" r="10" fill="#4CAF50" />
            <circle cx="140" cy="100" r="8" fill="#4CAF50" />
            <circle cx="130" cy="100" r="7" fill="#4CAF50" />
          </g>
          <g class="leaves leaves-2">
            <circle cx="65" cy="85" r="10" fill="#4CAF50" />
            <circle cx="60" cy="80" r="8" fill="#4CAF50" />
            <circle cx="70" cy="80" r="7" fill="#4CAF50" />
          </g>
          <g class="leaves leaves-3">
            <circle cx="125" cy="65" r="8" fill="#4CAF50" />
            <circle cx="130" cy="60" r="6" fill="#4CAF50" />
            <circle cx="120" cy="60" r="5" fill="#4CAF50" />
          </g>
        </svg>
        <p class="text-earth text-xl font-serif mt-4">L'art de la patience s'épanouit...</p>
      </div>
    </div>
  </template>
  
  <style scoped>
  @keyframes drawPath {
    to {
      stroke-dashoffset: 0;
    }
  }
  
  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .trunk, .branch {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawPath 2s ease-out forwards;
  }
  
  .branch {
    animation-delay: 1s;
  }
  
  .leaves {
    opacity: 0;
    transform-origin: center;
    animation: fadeInScale 0.5s ease-out forwards;
  }
  
  .leaves-1 {
    animation-delay: 2s;
  }
  
  .leaves-2 {
    animation-delay: 2.2s;
  }
  
  .leaves-3 {
    animation-delay: 2.4s;
  }
  </style>
  
  <script setup>
  // Pas de logique nécessaire ici
  </script>