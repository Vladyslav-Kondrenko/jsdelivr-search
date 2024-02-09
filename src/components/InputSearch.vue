<template>
  <div class="flex gap-2 items-center">
    <Input type="text" v-model="searchQuery" @input="searchPackages" placeholder="Input package name" class="my-5"/>
    <Button @click="clearInput" variant="outline" size="icon">
      <X class="w-4 h-4" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { X } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { ref, computed, watch } from 'vue';
import type { Package } from './package.type';
import { usePackagesStore } from '@/store/packages.store';

const searchQuery = ref<string>('');
const packagesStore = usePackagesStore();
let searchPage = computed(() => packagesStore.getActivePage);


function clearInput(){
  searchQuery.value = '';
  packagesStore.clearPackagesData();
}

watch(searchPage, () => {
  searchPackages();
});

async function searchPackages() {
  if (!searchQuery.value) {
    packagesStore.clearPackagesData();
    return;
  }

  try {
    const response = await fetch(`https://api.npms.io/v2/search?q=${searchQuery.value}&size=10&from=${(searchPage.value * 10)}`);
    const data = await response.json();
    const packages = ref<Package[]>([]);

    if (data.results) {
      packages.value = data.results.map((result: any) => ({
        name: result.package.name,
        author: result.package.author ? result.package.author.name : 'Unknown',
        description: result.package.description || 'No description',
        version: result.package.version,
        keywords: result.package.keywords || [],
        links: result.package.links
      }));
      packagesStore.setPackagesData(packages.value, data.total)
    } else {
      packagesStore.clearPackagesData();
    }
  } catch (error) {
    console.error('Error fetching packages:', error);
  }
}
</script>