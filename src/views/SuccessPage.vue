<template>
  <div class="success-view">
    <SuccessConfetti />
    <div class="success-page-content">
      <MainHeader
        :header="texts.steps[step].header"
        :subheading="texts.steps[step].subheading"
      />
      <div class="success-image-wrapper">
        <img
          alt="Success image"
          class="success-image"
          src="../assets/success.png"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
  import {inject} from "vue";
  const texts = inject("texts");
  const step = inject("current_step");
</script>
<style lang="css">
  .success-view {
    overflow: hidden;

    & span {
      color: var(--btn-secondary);
    }
  }

  .success-image-wrapper {
    & img {
      padding-top: 1rem;
      margin: 1rem auto;
    }
  }

  .success-page-content {
    padding-top: 8rem;

    & .heading {
      font-size: 3rem;

      @media (min-width: 600px) {
        font-size: 4rem;
      }
    }

    & .subheading {

      @media (min-width: 600px) {
        font-size: 1.7rem;
        font-family: "Roboto";
        font-weight: 300;
        padding-top: 0.3rem;
      }
    }

  }
</style>
"
