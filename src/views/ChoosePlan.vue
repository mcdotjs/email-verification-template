<template>
  <div class="choose-view">
    <MainHeader
      :header="texts.steps[step].header"
      :subheading="texts.steps[step].subheading"
    />
    <div class="choose-product-container">
      <div class="card-wrapper">
        <ProductCard
          v-for="(p, i) in products"
          @clicked="selectedProduct"
          :key="i"
          :best="p.duration == 'year' ? true : false"
          :time="p.billed"
          :currency="p.currency_mark"
          :price="p.price"
          :per="p.duration"
          :billed="p.billed"
          :trial="p.trial_days"
          :title="p.title"
          :selected="p.duration == computedSelected"
        />
      </div>
      <p class="cancel-p">Cancel anytime</p>

      <button
        @click="startTrial"
        class="secondary-button"
      >
        Start my free trial
      </button>
    </div>
    <div class="links"></div>
  </div>
</template>
<script setup>
  import axios from "axios";
  import { ref, onBeforeMount, inject, computed } from "vue";
  import ProductCard from "../components/ProductCard.vue";

  const apiUrl = inject("api_url");
  const step = inject("current_step");
  const texts = inject("texts");
  const userId = inject("user_id");

  const products = ref(null);

  onBeforeMount(async () => {
    products.value = await getProducts();
  });

  const getProducts = async () => {
    let products = null;
    await axios
      .get(apiUrl + "/api/products")
      .then((res) => {
        products = res.data;
      })
      .catch(async (error) => {
        return error;
      });
    const newProducts = {};
    const durationMap = {
      monthly: "month",
      year: "year",
    };

    for (const p in products) {
      const newP = augmentProduct(products[p], p);
      newProducts[durationMap[p]] = newP;
    }
    return newProducts;
  };

  const augmentProduct = (p, key) => {
    const temp = {};
    const currencyMarks = {
      USD: "$",
      EUR: "€",
    };
    const durationMap = {
      monthly: "month",
      year: "year",
    };

    const billedMap = {
      monthly: "monthly",
      year: "annually",
    };
    const titleMap = {
      monthly: "monthly",
      year: "annuall",
    };

    for (const field in p) {
      temp[field] = p[field];
      if (field == "currency") {
        temp["currency_mark"] = currencyMarks[p[field]];
      }
      temp["duration"] = durationMap[key];
      temp["billed"] = billedMap[key];
      temp["title"] = titleMap[key];
      temp["selected"] = true;
    }
    return temp;
  };

  const myProduct = ref("year");

  const selectedProduct = (e) => {
    const r = Object.keys(products.value).find((i) => e == i);
    myProduct.value = r;
  };

  const computedSelected = computed(() => myProduct.value);

  const startTrial = async () => {
    await axios
      .post(
        apiUrl + "/api/start-trial",
        { user_id: userId.value },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.status == 200) {
          step.value += 1;
        }
      })
      .catch(async (e) => {
        return e;
      });
  };
</script>

<style lang="css">
  .card-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;

    @media (min-width: 1100px) {
      flex-direction: row;
      padding: 2rem 1rem;
      padding-top: 1rem;
    }
  }

  .cancel-p {
    padding-top: 2rem;
    padding-bottom: 1rem;
    font-size: 1rem;
    font-weight: 300;
    font-family: "Roboto";
    text-align: center;

    @media (min-width: 900px) {
      flex-direction: row;
      padding-top: 0rem;
    }
  }

  .choose-view {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    row-gap: 3rem;
    min-height: 100vh;
    padding-top: 8rem;
  }
</style>
