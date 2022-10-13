<template>
  <div class="bg-[#8A9B6E] rounded-2xl lg:w-80 lg:h-80">
    <div class="py-4 md:font-bold lg:text-2xl text-black mt-12">New Task</div>
    <input
      class="rounded border-gray-300 lg:w-60 border-1 mb-1"
      placeholder="Write a Title"
      v-model="title"
      type="text"
    />

    <textarea
      class="rounded border-gray-300 lg:w-60 lg:h-40 border-1"
      placeholder="Write a Description"
      v-model="description"
      type="text"
    />
    <br />
    <button
      class="bg-black rounded px-8 py-2 mt-5 text-white transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
      @click="newTask"
    >
      Add Task
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
const title = ref("");
const description = ref("");
const emit = defineEmits(["refreshList"]);

async function newTask() {
  await useTaskStore().addTask(title.value, description.value);
  title.value = "";
  description.value = "";
  emit("refreshList");
}

// constant to save a variable that define the custom event that will be emitted to the homeView

// constant to save a variable that holds the value of the title input field of the new task

// constant to save a variable that holds the value of the description input field of the new task

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty

// const constant to save a variable that holds the value of the error message

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
</script>

<style></style>
