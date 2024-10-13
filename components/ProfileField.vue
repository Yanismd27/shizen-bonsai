<template>
    <div class="mb-4">
      <label :for="id" class="block text-sm font-medium text-earth mb-1">
        <span class="flex items-center">
          <component :is="iconComponent" v-if="iconComponent" class="w-5 h-5 mr-2 text-leaf" />
          {{ label }}
        </span>
      </label>
      <div v-if="!editable || !isEditing" class="mt-1">
        <p class="text-stone">{{ value }}</p>
        <button
          v-if="editable"
          @click="startEditing"
          class="text-sm text-leaf hover:text-earth transition-colors duration-200"
        >
          Modifier
        </button>
      </div>
      <div v-else class="mt-1 flex rounded-md shadow-sm">
        <input
          :id="id"
          v-model="editValue"
          :type="inputType"
          class="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-sand focus:ring-leaf focus:border-leaf bg-zen"
          :placeholder="label"
        />
        <button
          @click="saveEdit"
          class="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-zen bg-leaf hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leaf"
        >
          Sauvegarder
        </button>
        <button
          @click="cancelEdit"
          class="ml-2 inline-flex items-center px-3 py-2 border border-sand text-sm leading-4 font-medium rounded-md text-stone bg-zen hover:bg-sand hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sand"
        >
          Annuler
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import * as heroicons from '@heroicons/vue/24/outline';
  
  const props = defineProps({
    icon: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    editable: { type: Boolean, default: false },
    inputType: { type: String, default: 'text' },
  });
  
  const emit = defineEmits(['update']);
  
  const id = computed(() => props.label.toLowerCase().replace(/\s+/g, '-'));
  const isEditing = ref(false);
  const editValue = ref(props.value);
  
  const iconComponent = computed(() => {
    const iconName = props.icon.charAt(0).toUpperCase() + props.icon.slice(1) + 'Icon';
    return heroicons[iconName] || null;
  });
  
  const startEditing = () => {
    isEditing.value = true;
    editValue.value = props.value;
  };
  
  const saveEdit = () => {
    emit('update', editValue.value);
    isEditing.value = false;
  };
  
  const cancelEdit = () => {
    isEditing.value = false;
    editValue.value = props.value;
  };
  </script>