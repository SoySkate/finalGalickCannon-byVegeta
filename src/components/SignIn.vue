<template>
  <div class="bg-[url('/blat.jpg')] min-h-screen">
    <div class="flex justify-center items-center pt-32">
      <div class="w-full max-w-xs">
        <p v-if="errorMsg" class="">
          {{ errorMsg }}
        </p>
        <p class="flex justify-center mb-5">
          <img src="../../public/blackLogo.png" alt="logo" />
        </p>
        <form
          @submit.prevent="signIn"
          class="bg-[#8A9B6E] shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div class="identity-input mb-4">
            <label
              for="identity"
              class="block text-black text-sm font-bold mb-2"
            >
              Email</label
            >
            <input
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              aria-describedby="emailHelp"
              v-model="email"
              id="email"
            />
            <span class="text-xs text-red-700" id="emailHelp"></span>
          </div>

          <div class="password-input mb-6">
            <label
              for="identity"
              class="block text-black text-sm font-bold mb-2"
              >Password</label
            >
            <input
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              :type="passwordFieldType"
              onpaste="return false"
              placeholder="************"
              v-model="password"
              id="password"
            />

            <!-- Per poder veure la contrasenya -->
            <span class="">
              <EyeIcon
                :class="[passwordFieldIcon]"
                @click.prevent="hidePassword = !hidePassword"
              />
            </span>

            <span class="text-xs text-red-700" id="passwordHelp"></span>
          </div>
          <div class="flex justify-center">
            <button
              class="bg-[#354733] hover:bg-[#1D261B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6"
              type="submit"
            >
              Sign in
            </button>
          </div>
          <div class="flex items-center justify-center">
            <p class="">
              <span class=""
                >Not on ToDo yet?
                <PersonalRouter
                  class="inline-block align-baseline font-bold text-sm text-back text-lg hover:text-[#354733]"
                  :route="route"
                  :buttonText="buttonText"
              /></span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import Nav from "./Nav.vue";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Sign up";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style>
.wu-text {
  color: black;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
