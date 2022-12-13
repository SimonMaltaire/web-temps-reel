<template>
  <div class="absolute bottom-0 right-0 ma-6">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="top"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          size="x-large"
          color="primary"
          rounded
          icon
          v-bind="props"
        >
          <v-icon>mdi-message</v-icon>
        </v-btn>
      </template>
    
    <v-card min-height="700" min-width="300" max-width="380">
      <v-row no-gutters align="center" justify="space-between">
        <v-card-title>Bonjour !</v-card-title>
        <v-tooltip location="left" text="Réduire">
          <template v-slot:activator="{ props }">
            <v-btn @click="menu = false" flat size="small" icon v-bind="props" class="mx-3"><v-icon>mdi-window-minimize</v-icon></v-btn>
          </template>
        </v-tooltip>
      </v-row>
      <v-card-subtitle>Comment puis-je vous aider ?</v-card-subtitle>
      <v-divider class="my-3"></v-divider>
      <div class="ma-3">
        <v-btn rounded outlined class="my-1"><v-icon class="mr-3">mdi-tools</v-icon>Entretien de mon véhicule</v-btn>
        <v-btn rounded outlined class="my-1"><v-icon class="mr-3">mdi-information</v-icon>Information sur mon véhicule</v-btn>
        <v-btn rounded outlined class="my-1"><v-icon class="mr-3">mdi-phone</v-icon>Contact</v-btn>
      </div>
    </v-card>
  </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
      const menu = ref(false)

      return {
        menu
      }
    }
})
</script>

<style scoped>
.v-btn {
  text-transform: none;
}

</style>