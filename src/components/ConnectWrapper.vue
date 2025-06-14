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
            type="text"
            :value="num"
            class="code-input"
            maxlength="1"
            placeholder=""
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
      class="error-message-slide"
    >
      {{ errorMessage }}
      <span v-show="remainingTime != 30">({{ remainingTime }})</span>
    </div>
  </div>
</template>
<script setup>
import { ref, inject, watch, computed } from "vue";
import axios from "axios";
import ResendCode from "./ResendCode.vue";

const codeArr = ref(new Array(6));
const step = inject("current_step");
const userId = inject("user_id");
const userEmail = inject("user_email");
const errorMessage = ref(null);
const remainingTime = ref(30);
const timerId = ref(-1);
const verifyBtnDisabled = computed(() => {
  return remainingTime.value != 30;
});

const generateCode = async () => {
  if (remainingTime.value != 30) {
    return;
  }
  await axios
    .post(
      "http://localhost:8080/api/send-email",
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
  const val = e.target.value;

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
  if (e.key === "Backspace") {
    if (!e.target.value && e.target.previousElementSibling) {
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
      "http://localhost:8080/api/validate-email",
      { email: userEmail.value, code: clientCode },
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
      console.log("este", remainingTimeRef.value);
    } else {
      console.log("clear timer");
      remainingTime.value = 30;
      errorMessage.value = null;
      clearInterval(intervalId);
    }
  }, 1000);

  return intervalId;
};

//NOTE: modifing email, after resending code
watch(step, (n, o) => {
  if (o == 2 && n == 1 && userEmail.value) {
    remainingTime.value = 30;
    errorMessage.value = null;
    codeArr.value = new Array(6)
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

.code-input-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  margin-bottom: 2.3rem;
  @media (min-width: 900px) {
    gap: 1rem;
  }
}

.code-input {
  aspect-ratio: 1 / 1;
  width: 50px;
  border: 2px solid #e2e8f0;
  border-radius: var(--border-radius);
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  color: #2d3748;
  background: white;
  transition: all 0.2s ease;
  outline: none;
  caret-color: #4299e1;
  @media (min-width: 500px) {
    width: 60px;
  }

  @media (min-width: 600px) {
    width: 68px;
  }
}

.code-input:focus {
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.code-input:not(:placeholder-shown) {
  border-color: #48bb78;
  background: #f0fff4;
  animation: pulse 0.3s ease;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

@media (max-width: 480px) {
  .code-input {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }

  .code-input-container {
    gap: 8px;
  }
}

.error-message-slide {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  border: 1px solid #f87171;
  border-radius: var(--border-radius);
  padding: 0.5rem 2rem;
  color: #7f1d1d;
  font-size: 1.3rem;
  line-height: 1.5;
  position: fixed;
  top: 1rem;
  right: 2rem;
  animation: slideFromTopRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideFromTopRight {
  from {
    opacity: 0;
    transform: translate(200px, 0px);
  }

  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>
