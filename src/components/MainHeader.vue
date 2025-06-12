<template>
  <div class="main-header-container">
    <div class="heading">{{header}}</div>
    <div class="subheading">{{subheading}}</div>
  </div>
</template>
<script setup>
  // Connect Your Account
  const props = defineProps(['header', 'subheading'])
</script>
<style lang="css">
</style>
