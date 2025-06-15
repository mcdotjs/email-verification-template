<template>
  <MainHeader
    :header="texts.steps[currentStep].header"
    :subheading="texts.steps[currentStep]?.subheading"
  />

  <MainAdvantages />
  <ConnectWrapper />
  <TermOfService />
</template>
<script setup>
  import { inject } from "vue";
  const currentStep = inject("current_step");
  const texts = inject("texts");
</script>
