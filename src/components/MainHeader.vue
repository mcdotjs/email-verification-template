<template>
  <div class="main-header-container">
    <div
      class="heading"
      v-html="header"
    ></div>
    <div class="subheading">{{ subheading }}</div>
    <div
      v-show="step == 2 && userEmail"
      class="green-user-email"
    >
      {{ userEmail }}
    </div>
  </div>
</template>

<script setup>
  import { inject } from "vue";

  const props = defineProps(["header", "subheading"]);
  const step = inject("current_step");
  const userEmail = inject("user_email");
</script>

<style lang="css">
  .green-user-email {
    height:0px;
    color: #42d392;
    padding-top: 0.3rem;
    font-size: 2rem;
    font-weight: 400;
    text-align: center;
    width: 100%;
  }
</style>
