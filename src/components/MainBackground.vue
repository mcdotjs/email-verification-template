<template>
  <div class="bg-wrapper">
    <div class="background-container">
      <div class="blur-circle blue-circle pink"></div>
      <div
        class="blur-circle pink-circle animate-slow-pulse animate-drift-up greenball"
      ></div>
    </div>
  </div>
</template>
<style lang="css">
  .bg-wrapper {
    margin: 0;
    padding: 0;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: rgba(41,35,71,255);
    overflow: hidden;
  }

  .background-container {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.2;
  }

  .blur-circle {
    position: absolute;
    width: 288px;
    height: 288px;
    border-radius: 50%;
    mix-blend-mode: multiply;
    filter: blur(64px);
  }

  .blue-circle {
    background-color: #3b82f6;
    top: 76vh;
    left: 2vw;
    animation: slow-pulse 10s ease-in-out infinite;
  }

  .pink-circle {
    background-color: #ec4899;
    top: 80px;
    left: 288px;
    animation:
      slow-pulse 4s ease-in-out infinite,
      drift-up 18s ease-in-out infinite;
  }

  @keyframes slow-pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }

    50% {
      opacity: 0.7;
      transform: scale(1.8);
    }
  }

  @keyframes drift-up {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateX(400px);
    }
  }
</style>
