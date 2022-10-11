<template>
  <div>
    <div class="py-4 md:font-bold lg:text-2xl underline text-white">
      New Task:
    </div>
    <input
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
      placeholder="Write a Title"
      v-model="title"
      type="text"
    />
    <p>{{ title }}</p>
    <input
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Write a Description"
      v-model="description"
      type="text"
    />
    <p>{{ description }}</p>
    <button class="bg-cyan-500 rounded px-2 mt-5" @click="newTask">
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
