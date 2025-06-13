<template>
  <div style="width: 100%;min-height: 100vh;position: relative;">
    <MainBackground />
    <UpperLeftButtons />
    <div
      v-if="currentStep ==1 || currentStep == 2"
      class="main-grid-container"
    >
      <ConnectAndVerify />
    </div>

    <div v-else-if="currentStep == 3">
      <ChoosePlan />
    </div>

    <div v-else>
      <SuccessPage />
    </div>
  </div>
</template>

<script setup>
  import ChoosePlan from "./views/ChoosePlan.vue";
  import ConnectAndVerify from "./views/ConnectAndVerify.vue";
  import SuccessPage from "./views/SuccessPage.vue";
  import {inject} from "vue";
  const currentStep = inject("current_step")
</script>
