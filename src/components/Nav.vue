<template>
  <div>
    <nav class="mb-4">
      <div class="flex justify-between py-2 bg-[#354733]">
        <img
          class="ml-2 lg:ml-8 w-20 h-12"
          src="../../public/todo.png"
          alt="Logo To Do"
        />
        <button
          class="mr-2 lg:mr-8 bg-white rounded-full py-2 px-4 mx-4 border border-slate-200 hover:bg-[#D8DBCC]"
          @click="signOut"
        >
          Sign Out
        </button>

        <div v-if="errorMessageContainer">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const redirect = useRouter();

// constant to save a variable that will get the user from store with a computed function imported from vue
const userStore = useUserStore();

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.

//variable que muestra el error
const errorMessageContainer = ref(false);
const errorMessage = ref("");

async function signOut() {
  try {
    await userStore.signOut();
    // redirects user to the homeView
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    errorMessageContainer.value = true;
    errorMessage.value = error.message;
    setTimeout(() => {
      errorMessage.value = "";
    }, 2000);
  }
}
// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user
</script>

<style></style>
