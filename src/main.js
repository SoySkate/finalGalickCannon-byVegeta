import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// comenta este import de la linea 8 una ves quiera montar el layout que esto es el css original del proyecto.
// import "./assets/main.css";
import "./index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
