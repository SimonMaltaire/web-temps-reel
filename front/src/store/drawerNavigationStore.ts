import { defineStore } from "pinia";

export const useDrawerNavigationStore = defineStore('drawer-navigation', {
    state: () => ({
        show: true
    }),
    actions: {
        display () {
            this.show = !this.show
        }
    },
});