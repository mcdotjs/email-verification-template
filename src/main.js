import { createApp, ref } from 'vue'
import App from './App.vue'
import './style.css'
import texts from "./texts.json";

import MainHeader from './components/MainHeader.vue'
import MainBackground from './components/MainBackground.vue'
import MainAdvantages from './components/MainAdvantages.vue'
import ConnectWrapper from './components/ConnectWrapper.vue'
import TermOfService from './components/TermOfService.vue'
import UpperLeftButtons from './components/UpperLeftButtons.vue'


const app = createApp(App)

app.component("MainHeader", MainHeader)
app.component("MainBackground", MainBackground)
app.component("MainAdvantages", MainAdvantages)
app.component("ConnectWrapper", ConnectWrapper)
app.component("TermOfService", TermOfService)
app.component("UpperLeftButtons", UpperLeftButtons)

app.provide("texts", texts);

const currentStep = ref(1);
app.provide("current_step", currentStep);

const userId = ref(null);
app.provide("user_id", userId);

app.mount('#app')
