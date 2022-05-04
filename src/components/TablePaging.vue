<template>
  <div class="page-row">
    <div
      class="control-page-button"
      @click="changePage(Math.max(activePage - 1, 1))"
    >
      Назад
    </div>
    <div class="page-numbers">
      <span
        v-for="pageNum in pageCount"
        :key="pageNum"
        class="page-num-item"
        :class="{ 'active-page': activePage === pageNum }"
        @click="changePage(pageNum)"
        >{{ pageNum }}</span
      >
    </div>
    <div
      class="control-page-button"
      @click="changePage(Math.min(activePage + 1, pageCount))"
    >
      Далее
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const props = withDefaults(
  defineProps<{
    itemsCount?: number;
    itemsPerPage?: number;
  }>(),
  { itemsCount: 0, itemsPerPage: 10 }
);

const emit = defineEmits<{
  (ev: "pageChange", newPage: number): void;
}>();

const changePage = (newPage: number) => {
  emit("pageChange", newPage);
  activePage.value = newPage;
  router.push({ name: "home", params: { pageNum: activePage.value } });
};

const router = useRouter();

const activePage = ref(1);
const pageCount = computed<number>(() => {
  return Math.ceil(props.itemsCount / props.itemsPerPage);
});
{
  const routerPageNum = +router.currentRoute.value.params.pageNum;
  if (routerPageNum > 0 && routerPageNum < pageCount.value) {
    activePage.value = routerPageNum;
  }
}
</script>

<style scoped>
.active-page {
  color: #7ebc3c;
}

.control-page-button {
  cursor: pointer;
  user-select: none;
}

.page-numbers {
  font-size: 18px;
  font-style: italic;
}
.page-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #474955;
  font-weight: 500;
  font-size: 24px;
}

.page-num-item {
  margin: 0.5rem;
  cursor: pointer;
}

.page-num-item:hover {
  color: #5b852f;
}
</style>
