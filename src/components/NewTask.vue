<template>
  <button
    v-if="!taskButton"
    @click="taskButton = !taskButton"
    class="bg-[#E89A54] rounded-md px-8 py-1 mt-5 md:hidden text-black transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300"
  >
    + Add Task
  </button>
  <div
    v-else
    class="bg-[#8A9B6E] rounded-2xl md:w-80 lg:w-80 mx-4 lg:h-auto justify-center"
  >
    <div
      class="flex lg:justify-center sm:justify-center md:justify-center justify-between"
    >
      <div class="ml-14 md:ml-0 md:mt-10 sm:ml-0 sm:mt-10 lg:ml-0"></div>
      <div
        class="pb-8 pt-4 lg:pt-1 sm:font-bold text-2xl md:font-bold lg:text-2xl text-black lg:mt-12 md:mt-12"
      >
        New Task
      </div>
      <button
        v-if="!desktopView"
        @click="taskButton = !taskButton"
        class="mr-8 mb-6"
      >
        ❌​
      </button>
    </div>
    <input
      class="rounded-md px-2 mx-2 placeholder:italic border-gray-300 w-72 h-16 lg:w-60 border-1"
      placeholder="Write a Title"
      v-model="title"
      type="text"
    />
    <br />

    <textarea
      class="rounded-md px-2 pt-2 placeholder:italicborder-gray-300 w-72 h-32 lg:w-60 lg:h-40 border-1 mt-4"
      placeholder="Write a Description"
      v-model="description"
      type="text"
    />
    <br />
    <button
      class="bg-[#ED8C39] rounded-md mb-6 px-8 py-2 mt-5 text-black transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#FFAF36] duration-300"
      @click="newTask"
    >
      + Add Task
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
const title = ref("");
const description = ref("");
const emit = defineEmits(["refreshList"]);
const taskButton = ref(false);
const desktopView = ref(false);

async function newTask() {
  await useTaskStore().addTask(title.value, description.value);
  title.value = "";
  description.value = "";
  emit("refreshList");
  if (window.innerWidth < 600) {
    taskButton.value =!taskButton.value;
  }
}
function prueba() {
  console.log(window.innerWidth);
  if (window.innerWidth > 600) {
    taskButton.value = true;
    desktopView.value = true;
  } else if (window.innerWidth < 600) {
    taskButton.value = false;
    desktopView.value = false;
  }
}
prueba();

window.addEventListener("resize", () => {
  prueba();
});

// constant to save a variable that define the custom event that will be emitted to the homeView

// constant to save a variable that holds the value of the title input field of the new task

// constant to save a variable that holds the value of the description input field of the new task

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty

// const constant to save a variable that holds the value of the error message

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
</script>

<style></style>
