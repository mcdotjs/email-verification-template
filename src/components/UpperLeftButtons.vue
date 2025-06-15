<template>
  <div>
    <button
      v-show="step == 2"
      @click="step = 1"
      class="modify-email-button"
    >
      Modify Email
    </button>

    <img
      v-show="step == 3"
      @click="step = 1"
      alt="Back icon"
      class="back-icon-button"
      src="../assets/arrow-back.svg"
    />
  </div>
</template>
<script setup>
  import { inject } from "vue";
  const step = inject("current_step");
</script>
