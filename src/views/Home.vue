<template>
  <div class="bg-[#F2F0EB]">
    <Nav class="sticky top-0" />
    <div class="min-h-screen">
      <div class="md:flex md:justify-evenly md:px-14 lg:px-22">
        <div
          class="sticky top-16 lg:top-24 text-center rounded-md h-16 w-full bg-[#F2F0EB]"
        >
          <NewTask @refreshList="listTasks" class="mb-2" />
        </div>
        <div class="w-full">
          <TaskItem
            v-for="task in uncompleteItems"
            :key="task.id"
            :item="task"
            @refreshList="listTasks"
            @completeChild="completeTask"
          />
          <hr class="h-0.5 bg-black rounded-full" />
          <br />
          <h1 class="flex justify-center mb-4">Done Tasks :</h1>
          <hr class="h-0.5 bg-black rounded-full" />

          <div>
            <TaskItem
              v-for="task in completeItems"
              :key="task.id"
              :item="task"
              @refreshList="listTasks"
              @completeChild="completeTask"
            />
          </div>
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

const listItems = ref([]);
const uncompleteItems = ref([]);
const completeItems = ref([]);

async function listTasks() {
  listItems.value = await useTaskStore().fetchTasks();
  uncompleteItems.value = listItems.value.filter((item) => !item.is_complete);
  completeItems.value = listItems.value.filter((item) => item.is_complete);
}
listTasks();

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
