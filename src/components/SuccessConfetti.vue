<template>
  <div>
    <canvas
      class="confetti"
      id="canvas"
    ></canvas>
  </div>
</template>

<script setup>
  //vanilla source https://github.com/CogniSolver/confetti-animation
  import { onMounted, ref } from "vue";
  let confetti = [];
  const confettiCount = 300;
  const gravity = 0.5;
  const terminalVelocity = 5;
  const drag = 0.075;
  const colors = [
    { front: "red", back: "darkred" },
    { front: "green", back: "darkgreen" },
    { front: "blue", back: "darkblue" },
    { front: "yellow", back: "darkyellow" },
    { front: "orange", back: "darkorange" },
    { front: "pink", back: "darkpink" },
    { front: "purple", back: "darkpurple" },
    { front: "turquoise", back: "darkturquoise" },
  ];
  const ctx = ref(null);

  const randomRange = (min, max) => Math.random() * (max - min) + min;

  const initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        color: colors[Math.floor(randomRange(0, colors.length))],
        dimensions: {
          x: randomRange(10, 20),
          y: randomRange(10, 30),
        },

        position: {
          x: randomRange(0, window.innerWidth),
          y: window.innerHeight - 1,
        },

        rotation: randomRange(0, 2 * Math.PI),
        scale: {
          x: 1,
          y: 1,
        },

        velocity: {
          x: randomRange(-25, 25),
          y: randomRange(0, -50),
        },
      });
    }
  };

  const render = () => {
    const c = ctx.value;
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    confetti.forEach((confetto, index) => {
      let width = confetto.dimensions.x * confetto.scale.x;
      let height = confetto.dimensions.y * confetto.scale.y;

      // Move canvas to position and rotate
      c.translate(confetto.position.x, confetto.position.y);
      c.rotate(confetto.rotation);

      // Apply forces to velocity
      confetto.velocity.x -= confetto.velocity.x * drag;
      confetto.velocity.y = Math.min(
        confetto.velocity.y + gravity,
        terminalVelocity,
      );
      confetto.velocity.x +=
        Math.random() > 0.5 ? Math.random() : -Math.random();

      confetto.position.x += confetto.velocity.x;
      confetto.position.y += confetto.velocity.y;

      // Delete confetto when out
      if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

      // Loop confetto x position
      if (confetto.position.x > canvas.width) confetto.position.x = 0;
      if (confetto.position.x < 0) confetto.position.x = canvas.width;

      // Spin confetto by scaling y
      confetto.scale.y = Math.cos(confetto.position.y * 0.1);
      c.fillStyle =
        confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

      // Draw confetti
      c.fillRect(-width / 2, -height / 2, width, height);

      // Reset transform matrix
      c.setTransform(1, 0, 0, 1, 0, 0);
    });

    window.requestAnimationFrame(render);
  };

  onMounted(() => {
    const canvas = document.getElementById("canvas");
    ctx.value = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = ctx.value.canvas.width / 2;
    const cy = ctx.value.canvas.height / 2;

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cx = ctx.canvas.width / 2;
      cy = ctx.canvas.height / 2;
    });

    render();
    initConfetti();
  });
</script>

<style lang="css">
  .confetti {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  .message {
    position: absolute;
    font-size: 80px;
    font-family: cursive;
    font-weight: bold;
    color: #fff;
    animation: text-grow 1.5s linear infinite;
  }
</style>
