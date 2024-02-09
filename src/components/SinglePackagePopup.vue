<template>
  <AlertDialog :open="!!activePackage" v-if="activePackage" >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{activePackage.name}}
          <span class="font-normal">by</span>
          {{ activePackage.author }}
        </AlertDialogTitle>
        <AlertDialogDescription>
          <span class="font-bold">Description:</span>
          {{ activePackage.description }}
          <div class="flex gap-2 my-1 justify-center lg:justify-start" v-if="activePackage.links">
            <a class="hover:opacity-50 transition-opacity underline" v-if="activePackage.links.bugs" :href="activePackage.links.bugs" target="_blank">Report bugs</a>
            <a class="hover:opacity-50 transition-opacity underline" v-if="activePackage.links.homepage" :href="activePackage.links.homepage" target="_blank">Homepage</a>
            <a class="hover:opacity-50 transition-opacity underline" v-if="activePackage.links.repository" :href="activePackage.links.repository" target="_blank">Repository</a>
            <a class="hover:opacity-50 transition-opacity underline" v-if="activePackage.links.npm" :href="activePackage.links.npm" target="_blank">NPM</a>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter class="flex gap-2 f flex-col">
        <div class="flex flex-wrap gap-1">
          <Badge v-for="keyword in activePackage.keywords">{{ keyword }}</Badge>
        </div>
        <AlertDialogCancel @click="closeModal">Close</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { computed, onMounted, onUnmounted  } from 'vue';
import { usePackagesStore } from '@/store/packages.store';

const packagesStore = usePackagesStore()
let activePackage = computed(() => packagesStore.getActivePackage);

const closeModalWithEsc = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

const closeModal = () => {
  packagesStore.clearActivePackage();
}

onMounted(() => {
  window.addEventListener('keydown', closeModalWithEsc);
});

onUnmounted(() => {
  window.removeEventListener('keydown', closeModalWithEsc);
});

</script>
