<template>
  <MainBackground />
  <div class="main-grid-container">
    <MainHeader />
    <MainAdvantages />
    <ConnectWrapper />
    <TermOfService />
  </div>
</template>

<script setup>
  import MainHeader from "./components/MainHeader.vue";
  import MainBackground from "./components/MainBackground.vue";
  import MainAdvantages from "./components/MainAdvantages.vue";
  import ConnectWrapper from "./components/ConnectWrapper.vue";
  import TermOfService from "./components/TermOfService.vue";
  import axios from "axios";
  import {ref, onBeforeMount} from "vue";

  const products = ref(null);
  const getProducts = async () => {
    await axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        products.value = res.data;
      })
      .catch(async (error) => {
        return error;
      });
  };

  onBeforeMount(() => {
    getProducts();
  });


</script>
<style
  scoped
  lang="css"
>
</style>
