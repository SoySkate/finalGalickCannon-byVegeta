<template>
  <div
    class="card text-center bg-white border my-4 rounded-2xl"
    :class="[
      item.is_complete ? 'border border-green-500' : '',
      readyForEdit ? 'border border-blue-500' : '',
    ]"
  >
    <div class="mb-2 mt-4">
      <h1 class="font-bold underline" @click="permitEdit">Title</h1>
      <p :class="item.is_complete ? 'line-through' : ''" class="break-words">
        {{ item.title }}
      </p>
    </div>
    <input
      v-if="readyForEdit"
      class="rounded-md border-gray-300 lg:w-60 border-2 mb-1"
      placeholder="Write a new Title"
      v-model="newTitle"
      type="text"
    />
    <div class="mb-2">
      <h2 class="font-semibold underline">Description</h2>
      <p :class="item.is_complete ? 'line-through ' : ''" class="break-words">
        {{ item.description }}
      </p>
    </div>

    <textarea
      v-if="readyForEdit"
      class="rounded-md border-gray-300 lg:w-60 border-2 mb-1"
      placeholder="Write a new Description"
      v-model="newDescription"
      type="text"
    />

    <br />
    <div class="flex justify-evenly gap-1 py-4">
      <button
        class="rounded hover:bg-[#078C03] hover:text-white py-1 border px-6 border-black"
        :class="item.is_complete ? 'bg-[#078C03] text-white ' : ''"
        @click="completeTask"
      >
        Done✅
      </button>
      <button
        v-if="!readyForEdit"
        class="hover:bg-[#034AA6] rounded px-2 hover:text-white py-1 border px-6 border-black"
        @click="permitEdit"
      >
        Edit 📝
      </button>
      <button
        v-if="readyForEdit"
        class="bg-[#034AA6] rounded px-2 text-white border-2 hover:border-black py-1 border px-6 border-black"
        @click="editTask"
      >
        Commit Changes
      </button>
      <button
        class="hover:bg-[#A60303] rounded px-2 hover:text-white py-1 border px-6 border-black"
        @click="deleteT"
      >
        Delete🗑️
      </button>
    </div>
    <div v-if="errorEdit" class="text-red-700 bg-white rounded">
      ¡Error! You can't edit nothing if there are no parameters in edit Inputs.
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/task";
import { ref } from "vue";

const isClicked = ref(null);
const newTitle = ref("");
const newDescription = ref("");
const props = defineProps(["item"]);
const emit = defineEmits(["refreshList"]);
const errorEdit = ref(false);
const readyForEdit = ref(false);

async function editTask() {
  if (newTitle.value === "" && newDescription.value === "") {
    errorEdit.value = true;
    setTimeout(() => {
      errorEdit.value = false;
    }, "4000");
  } else if (newTitle.value === "") {
    await useTaskStore().updateDescription(newDescription.value, props.item.id);
  } else if (newDescription.value === "") {
    await useTaskStore().updateTitle(newTitle.value, props.item.id);
  } else {
    await useTaskStore().updateData(
      newTitle.value,
      newDescription.value,
      props.item.id
    );
  }
  emit("refreshList", "¨completeChild");
  newTitle.value = "";
  newDescription.value = "";
  readyForEdit.value = false;
}

async function deleteT() {
  await useTaskStore().deleteTask(props.item.id);
  emit("refreshList");
}

const clickFunction = (color) => {
  if (isClicked.value && isClicked.value === color) {
    return (isClicked.value = null);
  }
  isClicked.value = color;
};

const completeTask = () => {
  emit("completeChild", props.item);
  console.log(props.item);
};

function permitEdit() {
  readyForEdit.value = true;
  clickFunction("#034AA6");
}
// const props = defineProps(["ENTER-PROP-HERE"]);
</script>

<style></style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
