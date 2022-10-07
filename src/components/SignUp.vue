<template>
  <div class="bg-[url('../../public/normalmida.jpg')] min-h-screen">
    <div class="flex justify-center items-center pt-32">
      <div class="w-full max-w-xs">
        <p>
          DESPUES DE SIGN UP TE ANDA EN SIGN IN PARA VERIFICAR CORREO E INICIAR
          SESION, ENVIAR MENSAJE QUE NECESITAS VERIFICAR CORREO
        </p>
        <form
          @submit.prevent="signUp"
          class="bg-cyan-200 shadow-2xl rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="identity-input mb-4">
            <label
              for="identity"
              class="block text-gray-700 text-sm font-bold mb-2"
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
              class="block text-gray-700 text-sm font-bold mb-2"
              >Password</label
            >
            <input
              aria-describedby="passwordHelp"
              v-model="password"
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="**********"
            />
          </div>
          <div class="password-input mb-6">
            <label
              for="identity"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Confirm Password</label
            >
            <input
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="************"
              v-model="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            <PersonalRouter
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              :route="route"
              :buttonText="buttonText"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In Route ;)";

// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);

// Error Message

// Show hide password variable

// Show hide confrimPassword variable

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>

<style></style>
