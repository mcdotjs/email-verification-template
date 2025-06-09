<template>
  <MainBackground />
</template>

<script setup>
  import MainBackground from './components/MainBackground.vue';
  import axios from 'axios';
  import {ref, onBeforeMount} from 'vue';
  const products = ref(null)
  const getProducts = async () => {
    await axios.get("http://localhost:8080/api/products").then((res) => {
      products.value = res.data
    }).catch(async (error) => {
      return error;
    });
  };

  onBeforeMount(() => {
    getProducts()
  })

</script>
<style scoped>
</style>
