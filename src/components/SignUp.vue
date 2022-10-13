<template>
  <div class="bg-[url('/blat.jpg')] min-h-screen">
    <div class="flex justify-center items-center pt-32">
      <div class="w-full max-w-xs">
        <form
          @submit.prevent="signUp"
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
              class="block text-black text-sm font-bold mb-2"
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
          <div class="flex justify-center justify-evenly">
            <button
              class="bg-[#354733] hover:bg-[#1D261B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6"
              type="submit"
            >
              Sign up
            </button>
            <PersonalRouter
              class="inline-block align-baseline font-bold text-sm mt-2 text-back text-lg hover:text-[#354733]"
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
const buttonText = "Sign in";

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
