<template>
  <div class="input-box">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event as any).target.value)"
      style="flex-grow: 1; margin-right: 20px"
      placeholder="Поиск"
      type="text"
    />
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.7353 19.4958L14.7101 13.4663C15.8979 12.0418 16.6124 10.2213 16.6124 8.23301C16.6124 3.69689 12.8896 0.00860596 8.31048 0.00860596C3.73132 0.00860596 0 3.70119 0 8.23731C0 12.7734 3.72272 16.4617 8.30187 16.4617C10.2472 16.4617 12.0375 15.7946 13.4577 14.68L19.5045 20.7267C19.8574 21.0796 20.3824 21.0796 20.7353 20.7267C21.0882 20.3738 21.0882 19.8487 20.7353 19.4958ZM1.76452 8.23731C1.76452 4.67383 4.69966 1.77743 8.30187 1.77743C11.9041 1.77743 14.8392 4.67383 14.8392 8.23731C14.8392 11.8008 11.9041 14.6972 8.30187 14.6972C4.69966 14.6972 1.76452 11.7965 1.76452 8.23731Z"
        fill="white"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<style scoped>
.input-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 631px;
  padding-left: 26px;
  padding-right: 15px;
  background-color: #5a5c66;
}

input {
  padding: 0;
  color: white;
  outline: none;
  border: none;
  background-color: transparent;
  font-weight: 400;
  font-size: 14px;
  height: 52px;
}

input::placeholder {
  color: #b3b7bf;
}
</style>
