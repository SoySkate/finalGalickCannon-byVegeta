<template>
  <div class="bg-[#F2F0EB]">
    <Nav class="sticky top-0" />
    <div class="min-h-screen">
      <div class="md:flex md:justify-evenly md:px-14 lg:px-22">
        <div
          class="z-100 sticky top-16 lg:top-24 md:top-24 text-center mb-2 rounded-md h-16 lg:w-1/3 bg-[#F2F0EB]"
        >
          <NewTask @refreshList="listTasks" class="mb-4" />
          <a
            class="border ml-4 lg:mr-4 border-black rounded-md mb-6 md:px-8 px-4 py-2 mt-5 text-black transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#354733] hover:text-white duration-300"
            href="#doneButton"
          >
            View done tasks
          </a>
        </div>
        <div class="w-full z-0">
          <TaskItem
            v-for="task in uncompleteItems"
            :key="task.id"
            :item="task"
            @refreshList="listTasks"
            @completeChild="completeTask"
          />
          <div id="doneButton"></div>
          <hr class="h-0.5 mt-20 bg-black rounded-full" />
          <br />
          <h1 class="flex justify-center font-bold mb-4">Done tasks</h1>
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
