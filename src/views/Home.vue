<template>
  <div class="bg-[#F2F0EB]">
    <Nav class="sticky top-0" />
    <div class="min-h-screen">
      <div class="md:flex md:justify-between md:px-8">
        <div
          class="sticky top-16 text-center rounded-2xl h-12 w-52 bg-[#F2F0EB]"
        >
          <NewTask v-if="taskButton" @refreshList="listTasks" class="mb-2" />
          <button
            @click="taskButton = !taskButton"
            class="bg-orange-500 rounded-xl px-4 mt-2 py-1 md:hidden"
          >
            Create a New Task ! ! !
          </button>
        </div>
        <div class="w-1/2 flex justify-center flex-col">
          <TaskItem
            v-for="task in listItems"
            :key="task.id"
            :item="task"
            @refreshList="listTasks"
            @completeChild="completeTask"
          />
        </div>
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

//definicion de nuestra tienda en una variable para que sea mas facil de usar(mas leible)
let taskStore = useTaskStore();

// funcion para completar tarea conectandose a supabase
async function completeTask(task) {
  let boolean = !task.is_complete;
  let id = task.id;
  await taskStore.completeTask(boolean, id);
  listTasks();
}
</script>

<style></style>
