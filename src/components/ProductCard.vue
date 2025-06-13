<template>
  <div
    class="pricing-card"
    :class="{ 'best-val-border': best }"
  >
    <div
      class="save-badge"
      v-if="best"
    >Save 20%</div>

    <div
      class="card-content"
      :class="{ 'cursor-pointer': !selected }"
      @click="$emit('clicked', per)"
    >
      <div class="best-value-container">
        <div
          v-if="selected"
          class="check-icon"
        ></div>
        <div
          v-else
          class="empty-icon"
        ></div>
        <div>
          <span
            v-if="best"
            class="best-value-text"
          >Best Value</span>
          <h2 class="plan-title">{{ title }}</h2>
        </div>
      </div>

      <div class="pricing-info">
        <div class="price">
          {{ currency }}{{price}}<span
            class="time"
            style=""
          >/{{ per }}</span>
        </div>
        <p class="billing-period">Billed {{billed}}</p>
      </div>

      <div class="trial-badge">{{trial}}-day free trial</div>
    </div>
  </div>
</template>
<script setup>
  import {defineEmits} from 'vue';
  const props = defineProps(["selected", "currency", "price", "time", "title", "billed", "trial", "best", "per"]);
  const emits = defineEmits("clicked")
</script>
<style lang="css">
  .pricing-card {
    position: relative;
    min-width: 330px;
    width: 100%;
    background: linear-gradient(135deg,
        rgba(139, 69, 199, 0.3) 0%,
        rgba(75, 0, 130, 0.2) 100%);
    backdrop-filter: blur(20px);
    transition: all 0.3s ease;
    border-radius: 12px;

    @media(min-width:520px) {
      min-width: 500px;
    }

  }

  .best-val-border {
    border: 2px solid;
    border-image: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1) 1;
  }

  .save-badge {
    position: absolute;
    top: -28px;
    right: 10px;
    background: linear-gradient(135deg, #4ecdc4, #44a08d);
    color: #1a1a2e;
    padding: 3px 16px;
    border-radius: 12px 12px 0px 0px;
    font-weight: 700;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
  }

  .best-value-text {
    color: var(--text-accent);
    font-size: 1.3rem;
    font-weight: 200;
    text-transform: uppercase;
    letter-spacing: 1px;

    @media(min-width:1100px) {
      display: none;
    }
  }

  .plan-title {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 24px 0;
    text-transform: capitalize;

    @media(min-width:1100px) {
      font-size: 2.3rem;
      margin: 0;
      padding: 1rem;
    }
  }

  .pricing-info {
    grid-column: 2;
    grid-row: 1 / span 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(0, 0, 0, 0.4);
    text-align: right;
  }

  .price {
    color: #ffffff;
    font-size: 1.8rem;
    font-weight: 700;
    text-align: center;
    margin: 0;

    @media(min-width:1100px) {
      font-size: 2.8rem;
      padding-top: 0.8rem;
    }
  }

  .price .time {
    font-size: 1.3rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);

    @media(min-width:1100px) {
      font-size: 2rem;
    }
  }

  .billing-period {
    font-family: "Roboto";
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.1rem;
    text-align: center;
    margin: 0px auto;

    @media(min-width:1100px) {
      font-size: 1.3rem;
      text-align: center;
      padding-bottom: 1.2rem;
    }
  }

  .trial-badge {
    background: rgba(0, 0, 0, 0.6);
    color: #ffd700;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    grid-column: 2;
    grid-row: 6 / span 2;

    @media(min-width:1100px) {
      display: block;
      padding: 1rem;
      font-size: 1.5rem;
      text-align: center;
    }
  }

  .card-content {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(7, 20px);

    @media (min-width:1100px) {
      display: block;
    }

  }

  .pricing-card::before {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b);
    background-size: 300% 300%;
    animation: gradient-shift 3s ease infinite;
  }

  .best-value-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 4rem;

    grid-column: 1;
    grid-row: 2;

    @media(min-width:1100px) {
      font-size: 1.3rem;
      gap: 0;
      margin: 0;
      position: relative;
    }
  }

  .empty-icon {
    width: 24px;
    height: 24px;
    background: transparent;
    border: 3px solid rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: -1.4rem;
    cursor: pointer;

    @media(min-width:1100px) {
      width: 34px;
      height: 34px;

      margin: 0;
      position: absolute;
      left: 1.3rem;
      top: 1rem;
    }
  }

  .check-icon {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #4ecdc4, #44a08d);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -1.4rem;

    @media(min-width:1100px) {
      width: 34px;
      height: 34px;

      margin: 0;
      position: absolute;
      left: 1.3rem;
      top: 1rem;
    }
  }

  .check-icon::after {
    content: "✓";
    color: white;
    font-weight: bold;
    font-size: 14px;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>
