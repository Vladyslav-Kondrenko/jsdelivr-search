<template>
  <div>
    <Table v-if="packages.length">
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">Name</TableHead>
          <TableHead class="w-[100px]">Author</TableHead>
          <TableHead>Description</TableHead>
          <TableHead class="text-right w-[75px]">Version</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, index) in packages" :key="index" @click="packagesStore.setActivePackage(item)" class="cursor-pointer">
          <TableCell class="font-medium">{{ item.name }}</TableCell>
          <TableCell>{{ item.author }}</TableCell>
          <TableCell>{{ item.description }}</TableCell>
          <TableCell class="text-right">{{ item.version }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePackagesStore } from '@/store/packages.store';
import { computed } from 'vue';

const packagesStore = usePackagesStore();
let packages = computed(() => packagesStore.getPackages);
console.log(packages)

</script>
