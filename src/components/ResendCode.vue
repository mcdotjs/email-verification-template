<template>
  <div class="resend-item">
    Didn't get an email? <span @click="handleResend">Resend Code</span>.
  </div>
</template>

<script setup>
  const emit = defineEmits(['resend'])

  const handleResend = () => {
    emit('resend')
  }
</script>

<style lang="css">
  .resend-item {
    font-size: 1.3rem;
    height: 66px;
    padding: 1rem;
    max-width: 580px;
    margin: 0 auto;
    text-align: center;
    color: var(--text-primary);

    span {
      color: var(--info);
      text-decoration: none;
      cursor: pointer;
    }
  }
</style>
