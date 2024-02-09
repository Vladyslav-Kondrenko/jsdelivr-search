<template>
  <Pagination v-if="items > 0" v-slot="{ page }" :total="items" :sibling-count="1" show-edges :default-page="page" class="mt-3">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1 justify-center">
      <PaginationFirst @click="goToPage(1)"/>
      <PaginationPrev @click="goToPage(page-1)"/>

      <template v-for="(item, index) in items">
        <PaginationListItem class="hidden md:flex lg:flex" v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'" @click="goToPage(item.value)">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" class="hidden md:flex lg:flex" />
      </template>

      <PaginationNext @click="goToPage(page+1)"/>
      <PaginationLast @click="goToPage(numberOfLastPage)"/>
    </PaginationList>
  </Pagination>
</template>

<script setup lang="ts">
  import { usePackagesStore } from '@/store/packages.store';
  import { computed, ref, watch } from 'vue';
  import { Button} from '@/components/ui/button'
  import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
  } from '@/components/ui/pagination'


  let page = ref<number>(1);
  let numberOfLastPage = computed(() => Math.ceil( items.value / 10 ) - 1 )
  const packagesStore = usePackagesStore();

  let items = computed(() => packagesStore.getPackagesCount);

  watch(items, () => {
    packagesStore.setActivePage(1);

  })
  
  function goToPage(pageNumber: number){
    packagesStore.setActivePage(pageNumber);
  }


</script>