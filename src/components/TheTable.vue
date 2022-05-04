<template>
  <div>
    <table style="margin-bottom: 15px">
      <tr>
        <th style="width: 110px">
          <ExpandMore
            :ref="(el: any) => sortExpansionItems.set('id', el)"
            prop-name="id"
            text="ID"
            @change-status="sortStatusChange"
          ></ExpandMore>
        </th>
        <th style="width: 530px">
          <ExpandMore
            :ref="(el: any) => sortExpansionItems.set('title', el)"
            prop-name="title"
            text="Заголовок"
            @change-status="sortStatusChange"
          ></ExpandMore>
        </th>
        <th>
          <ExpandMore
            :ref="(el: any) => sortExpansionItems.set('body', el)"
            prop-name="body"
            text="Описание"
            @change-status="sortStatusChange"
          ></ExpandMore>
        </th>
      </tr>
      <tr v-for="itemId in itemsPerPage" :key="itemId">
        <td style="text-align: center">
          {{ queryWithPagingView[itemId - 1]?.id }}
        </td>
        <td>
          {{ queryWithPagingView[itemId - 1]?.title }}
        </td>
        <td style="white-space: pre">
          {{ queryWithPagingView[itemId - 1]?.body }}
        </td>
      </tr>
    </table>
    <TablePaging
      :items-count="searchQueryView.length"
      :items-per-page="itemsPerPage"
      @page-change="(pg) => (activePage = pg)"
      style="margin-bottom: 30px"
    ></TablePaging>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import ExpandMore from "./ExpandMore.vue";
import TablePaging from "./TablePaging.vue";

export interface TableDataType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type SortDirectionType = "asc" | "desc" | "none";

const props = withDefaults(
  defineProps<{
    tableData: TableDataType[];
    searchQuery: string;
  }>(),
  {
    tableData: () => [],
    searchQuery: "",
  }
);

const activePage = ref(1);
const itemsPerPage = 10;

const sortExpansionItems = new Map<
  keyof TableDataType,
  InstanceType<typeof ExpandMore>
>();
const sortPropName = ref<keyof TableDataType>("id");
const sortDirection = ref<SortDirectionType>("asc");

const sortStatusChange = (
  propName: keyof TableDataType,
  direction: SortDirectionType
) => {
  for (const [prop, elem] of sortExpansionItems.entries()) {
    if (prop !== propName) {
      elem.clearStatus();
    }
  }
  sortPropName.value = propName;
  sortDirection.value = direction;
};

const searchQueryView = computed<TableDataType[]>(() => {
  if (props.searchQuery.length === 0) {
    return props.tableData;
  }
  return props.tableData.filter((el) => {
    return (
      el.title.includes(props.searchQuery) ||
      el.body.includes(props.searchQuery)
    );
  });
});

const sortedQueryView = computed<TableDataType[]>(() => {
  if (sortDirection.value === "none") {
    return searchQueryView.value;
  }
  return searchQueryView.value.sort((aObj, bObj) => {
    let a = aObj[sortPropName.value];
    let b = bObj[sortPropName.value];
    if (sortDirection.value === "desc") {
      const temp = b;
      b = a;
      a = temp;
    }
    if (typeof a === "number") {
      return +a - +b;
    } else if (typeof a === "string") {
      return (a as unknown as string).localeCompare(b as unknown as string);
    } else {
      return 0;
    }
  });
});

const queryWithPagingView = computed<TableDataType[]>(() => {
  const firstId = (activePage.value - 1) * itemsPerPage;
  return sortedQueryView.value.slice(firstId, firstId + itemsPerPage);
});
</script>

<style scoped>
.row-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 137.69%;
  width: 100%;
}

th {
  text-align: center;
  background-color: #474955;
  color: #ffffff;
  padding-top: 19px;
  padding-bottom: 16px;
}

tr {
  height: 56px;
}

td {
  border: 1px solid #ddd;
  padding: 15px;
  color: #474955;
}
</style>
