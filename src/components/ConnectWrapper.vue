<template>
  <div style="height: 100%; padding-top: 4rem">
    <div class="small-container">
      <div v-if="step == 1">
        <input
          v-model="userEmail"
          type="email"
          class="input-field"
          placeholder="Email Address"
          @focus="errorMessage = null"
        />
      </div>

      <div v-if="step == 2">
        <div class="code-input-container">
          <input
            v-for="(num, idx) in codeArr"
            :data-index="idx"
            :id="'code' + idx"
            type="number"
            :value="num"
            class="code-input"
            maxlength="1"
            pattern="[0-9]"
            @input="handleCodeInput"
            @keydown="handleCodeInputKeydown"
            @focus="errorMessage = null"
          />
        </div>
      </div>
      <div v-if="step == 1">
        <div class="offer-checkbox">
          <input
            name="check"
            id="check"
            type="checkbox"
          />
          <label for="check">Send Me Offers, News, and Fun Stuff!</label>
        </div>

        <button
          @click="generateCode"
          class="primary-button"
          :disabled="verifyBtnDisabled"
        >
          Connect
        </button>
      </div>
      <div v-if="step == 2">
        <ResendCode @resend="generateCode" />
        <button
          @click="verify"
          class="primary-button"
          :disabled="verifyBtnDisabled"
        >
          Verify
        </button>
      </div>
    </div>
    <div
      v-if="errorMessage"
      @click="errorMessage = null"
      class="error-message-slide"
    >
      {{ errorMessage }}
      <span v-show="remainingTime != WAITING_TIME">({{ remainingTime }})</span>
    </div>
  </div>
</template>
<script setup>
  import { ref, inject, watch, computed, onMounted } from "vue";
  import axios from "axios";
  import ResendCode from "./ResendCode.vue";

  const WAITING_TIME = 30;
  const codeArr = ref(new Array(6));
  const step = inject("current_step");
  const userId = inject("user_id");
  const userEmail = inject("user_email");
  const apiUrl = inject("api_url");

  const errorMessage = ref(null);
  const remainingTime = ref(WAITING_TIME);
  const timerId = ref(-1);
  const verifyBtnDisabled = computed(() => {
    return remainingTime.value != WAITING_TIME;
  });

  onMounted(() => {
    userEmail.value = "";
  });

  const generateCode = async () => {
    if (remainingTime.value != WAITING_TIME) {
      return;
    }

    await axios
      .post(
        apiUrl + "/api/send-email",
        { email: userEmail.value },
        { withCredentials: true },
      )
      .then((res) => {
        //NOTE: server just print in console
        if (res.status == 200) {
          step.value = 2;
        }
      })
      .catch(async (e) => {
        errorMessage.value = e.response.data.error;
        if (e.status == 429) {
          timerId.value = timer(remainingTime);
        }
        return e;
      });
  };

  const handleCodeInput = (e) => {
    const val = e.target.value.toString();
    if (!/^\d*$/.test(val)) {
      e.target.value = "";
      return;
    }

    codeArr.value[e.srcElement.dataset["index"]] = val;

    if (val && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    }
  };

  const handleCodeInputKeydown = (e) => {
    let currentValue = e.target.value;
    if (currentValue.length >= 1 && e.key !== "Backspace") {
      e.preventDefault();
      return;
    }
    if (e.key === "Backspace") {
      if (!currentValue && e.target.previousElementSibling) {
        e.target.previousElementSibling.focus();
      }
    }
  };

  const verify = async () => {
    const clientCode = codeArr.value.join("");
    if (clientCode.length != 6) {
      errorMessage.value = "Code must be filled";
      return;
    }
    await axios
      .post(
        apiUrl + "/api/validate-email",
        {
          email: userEmail.value,
          code: clientCode,
        },
        { withCredentials: true },
      )
      .then((res) => {
        userId.value = res.data.user_id;
        step.value = 3;
      })
      .catch(async (e) => {
        errorMessage.value = e.response?.data?.error;
        return e;
      });
  };

  const timer = (remainingTimeRef) => {
    const intervalId = setInterval(() => {
      if (remainingTimeRef.value > 0) {
        remainingTimeRef.value -= 1;
      } else {
        remainingTime.value = WAITING_TIME;
        errorMessage.value = null;
        clearInterval(intervalId);
      }
    }, 1000);

    return intervalId;
  };

  //NOTE: modifing email, after resending code
  watch(step, (n, o) => {
    if (o == 2 && n == 1 && userEmail.value) {
      remainingTime.value = WAITING_TIME;
      errorMessage.value = null;
      codeArr.value = new Array(6);
      clearInterval(timerId.value);
    }
  });
</script>

<style lang="css">
  .verification-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 100%;
  }

  .email {
    color: #4299e1;
    font-weight: 600;
  }
</style>
