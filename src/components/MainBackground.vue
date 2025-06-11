<template>
  <div class="bg-wrapper">
    <div class="background-container">
      <div class="blur-circle blue-circle pink"></div>
      <div class="blur-circle purple-circle yellowball"></div>
      <div class="blur-circle pink-circle animate-slow-pulse animate-drift-up greenball"></div>
    </div>
  </div>
</template>
<style lang="css">
  .bg-wrapper {
    margin: 0;
    padding: 0;
    z-index: -1;
    min-height: 100vh;
    min-width: 100vw;
    position: absolute;
    background: #2d234b;
  }

  .background-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.2;
  }

  .blur-circle {
    position: absolute;
    width: 288px;
    /* 72 * 4 = 288px (18rem) */
    height: 288px;
    border-radius: 50%;
    mix-blend-mode: multiply;
    filter: blur(64px);
    /* xl blur */
  }

  .blue-circle {
    background-color: #3b82f6;
    /* blue-500 */
    top: 600px;
    /* top-20 = 5rem = 80px */
    left: 176px;
    /* left-44 = 11rem = 176px */
  }

  .purple-circle {
    background-color: #8b5cf6;
    /* purple-500 */
    top: 160px;
    /* top-40 = 10rem = 160px */
    right: 80px;
    /* right-20 = 5rem = 80px */
    animation: slow-pulse 4s ease-in-out infinite;
  }

  .pink-circle {
    background-color: #ec4899;
    /* pink-500 */
    top: 80px;
    /* bottom-20 = 5rem = 80px */
    left: 288px;
    /* right-72 = 18rem = 288px */
    animation: slow-pulse 4s ease-in-out infinite, drift-up 6s ease-in-out infinite;
  }

  @keyframes slow-pulse {

    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }

    50% {
      opacity: 0.7;
      transform: scale(1.05);
    }
  }

  @keyframes drift-up {

    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-20px);
    }
  }
</style>
