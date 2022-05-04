<template>
  <span class="row-header"
    >{{ text
    }}<span
      class="material-symbols-outlined"
      :class="{ rotated: localStatusId === 2 }"
      @click="onClick"
    >
      {{ localStatusId != 0 ? "expand_more" : "remove" }}
    </span></span
  >
</template>

<script lang="ts">
import { ref } from "vue";
import { TableDataType } from "./TheTable.vue";

const statuses = ["none", "asc", "desc"] as const;
</script>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  propName: keyof TableDataType;
}>();
const emit = defineEmits<{
  (
    ev: "changeStatus",
    propName: keyof TableDataType,
    direction: typeof statuses[number]
  ): void;
}>();

const localStatusId = ref(0);
const onClick = () => {
  localStatusId.value = (localStatusId.value + 1) % statuses.length;
  emit("changeStatus", props.propName, statuses[localStatusId.value]);
};
const clearStatus = () => {
  localStatusId.value = 0;
};

defineExpose({
  clearStatus,
});
</script>

<style scoped>
.row-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.material-symbols-outlined {
  user-select: none;
  cursor: pointer;
}

.material-symbols-outlined.rotated {
  transform: rotate(180deg);
}
</style>
