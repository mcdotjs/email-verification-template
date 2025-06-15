<template>
  <div class="advantages-container">
    <div
      class="advantage-item"
      v-for="(advantage, idx) in texts.page_one.advantages"
      :key="advantage + idx"
    >
      <div class="advantage-overlay"></div>
      <div class="advantage-content">
        <img
          class="advantage-icon"
          src="../assets/check.svg"
        />
        <div class="advantage-text">
          {{ advantage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject } from "vue";
  const texts = inject("texts");
</script>

<style scoped lang="css">
  .advantages-container {
    font-size: 1.48rem;
    line-height: 1.75rem;
    max-width: 550px;
    margin: 0 auto;
  }

  .advantage-item {
    position: relative;
    padding: 0.4rem 1rem;
  }

  .advantage-overlay {
    opacity: 0.1;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #0891b2 100%);
  }

  .advantage-overlay.no-background {
    background-color: transparent;
  }

  .advantage-content {
    display: flex;
    flex-direction: row;
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .advantage-icon {
    width: 33px;
    flex-shrink: 0;
  }

  .advantage-text {
    margin-top: 0.25rem;
    flex: 1;
  }

  .advantage-item:nth-child(2) .advantage-overlay {
    background: none;
  }
</style>
