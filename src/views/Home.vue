<template>
  <Nav />
  <div class="min-h-screen">
    <div class="md:flex md:justify-evenly">
      <div class="sticky top-0 bg-slate-500 text-center rounded h-30 w-52 md:">
        <NewTask v-if="taskButton" @refreshList="listTasks" class="mb-2" />
        <button
          @click="taskButton = !taskButton"
          class="bg-orange-500 rounded px-2 my-2 md:hidden"
        >
          Create a New Task ! ! !
        </button>
      </div>
      <div>
        <TaskItem
          v-for="task in listItems"
          :key="task.id"
          :item="task"
          @refreshList="listTasks"
        />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from "vue";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import Footer from "../components/Footer.vue";
import TaskItem from "../components/TaskItem.vue";
import { useTaskStore } from "../stores/task";
const taskButton = ref(false);
const listItems = ref([]);

async function listTasks() {
  listItems.value = await useTaskStore().fetchTasks();
}
listTasks();

function prueba() {
  console.log(window.innerWidth);
  if (window.innerWidth > 500) {
    taskButton.value = true;
  } else if (window.innerWidth < 500) {
    taskButton.value = false;
  }
}
prueba();
</script>

<style></style>
