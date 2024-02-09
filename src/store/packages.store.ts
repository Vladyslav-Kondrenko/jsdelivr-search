import { defineStore } from 'pinia'
import type { Package } from '@/components/package.type'

export const usePackagesStore = defineStore('packages', {
  state: () => ({
    packagesData: [] as Package[],
    packagesCount: 0 as number,
    activePage: 1 as number,
    activePackage: null as null | Package,
  }),

  getters: {
    getPackages() : Package[]{
      return this.packagesData;
    },

    getActivePackage(): Package | null{
      return this.activePackage;
    },

    getActivePage(): number{
      return this.activePage;
    },

    getPackagesCount(): number{
      return this.packagesCount;
    }
  },

  actions: {
    setPackagesData(data:Package[], packagesCount: number) : void {
      this.packagesData = data;
      this.packagesCount = packagesCount
    },

    clearPackagesData(): void {
      this.packagesData = [];
      this.packagesCount = 0
    },

    setActivePage(page:number): void {
      this.activePage = page;
    },

    setActivePackage(activePackage:Package): void {
      this.activePackage = activePackage;
    },

    clearActivePackage(): void {
      this.activePackage = null;
    }

  }
});