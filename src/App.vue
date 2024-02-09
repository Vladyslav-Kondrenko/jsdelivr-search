<template>
  <div class="min-h-screen flex flex-col mx-auto">
    <div class="container px-1 md:px-5">
      <InputSearch/>
      <PackagesTable/>
      <PackagesPagination/>
      <SinglePackagePopup/>
    </div>
    <div class="container mt-auto">
      <MainFooter/>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputSearch from '@/components/InputSearch.vue'
import PackagesTable from '@/components/PackagesTable.vue'
import PackagesPagination from '@/components/PackagesPagination.vue'
import SinglePackagePopup from '@/components/SinglePackagePopup.vue'
import MainFooter from '@/components/MainFooter.vue'

</script>


<style scoped>

</style>
