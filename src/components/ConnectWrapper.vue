<template>
  <div>
    <div class="small-container">
      <div v-if="step == 1">
        <div>
          <input
            type="email"
            class="input-field"
            placeholder="Email Address"
          />
        </div>
      </div>
      <div v-if="step == 2">
        <div class="code-input-container">
          <input
            v-for="(num,idx) in codeArr"
            :data-index="idx"
            :id="'code'+idx"
            type="text"
            :value="num"
            class="code-input"
            maxlength="1"
            placeholder=""
            @input="handleCodeInput"
            @keydown="handleCodeInputKeydown"
            style="
            "
          >
        </div>
      </div>

      <div
        v-if="step == 1"
        class="offer-checkbox"
      >
        <input
          name="check"
          id="check"
          type="checkbox"
        />
        <label for="check">Send Me Offers, News, and Fun Stuff!</label>
        <button
          @click="generateCode"
          class="primary-button "
          style="margin-top:2rem"
        >
          Connect
        </button>
      </div>

      <div v-if="step == 2">
        <ResendCode />

        <button
          @click="verify"
          class="primary-button"
        >Verify</button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {ref, inject} from "vue"
  import axios from "axios"
  import ResendCode from "./ResendCode.vue";

  const codeArr = ref(new Array(6))
  const step = inject("current_step")
  const userId = inject("user_id")

  const err = ref(false)
  const generateCode = async () => {
    await axios
      .post("http://localhost:8080/api/send-email", {email: "jkljdddd@jklkjl.sk"}, {withCredentials: true})
      .then((res) => {
        //NOTE: server just print in console
        if (res.status == 200) {
          step.value += 1
        }
      })
      .catch(async (e) => {
        err.value = true
        return e;
      });
  };

  const handleCodeInput = (e) => {
    const val = e.target.value;

    if (!/^\d*$/.test(val)) {
      e.target.value = '';
      return;
    }

    codeArr.value[e.srcElement.dataset["index"]] = val

    if (val && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    }
  };

  const handleCodeInputKeydown = (e) => {
    if (e.key === 'Backspace') {
      if (!e.target.value && e.target.previousElementSibling) {
        e.target.previousElementSibling.focus();
      }
    }
  };

  //TODO:?paste
  const success = ref(false)

  const verify = async () => {
    const clientCode = codeArr.value.join("")
    if (clientCode.length != 6) {
      alert("bad code")
      return false
    }

    await axios
      .post("http://localhost:8080/api/validate-email", {email: "jkljdddd@jklkjl.sk", code: clientCode}, {withCredentials: true})
      .then((res) => {
        success.value = true
        userId.value = res.data.user_id;
        step.value += 1
      })
      .catch(async (e) => {
        err.value = true
        return e;
      });

  }

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
    justify-content: space-between;
    margin-bottom: 3rem;
    gap: 20px;
  }

  .code-input {
    aspect-ratio: 1;
    margin-bottom: 3.5rem;
    width: 100%;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 2.8rem;
    font-weight: 600;
    text-align: center;
    color: #2d3748;
    background: white;
    transition: all 0.2s ease;
    outline: none;
    caret-color: #4299e1;
  }

  .code-input:focus {
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }

  .code-input:not(:placeholder-shown) {
    border-color: #48bb78;
    background: #f0fff4;
    /* animation: pulse 0.3s ease; */
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
</style>
