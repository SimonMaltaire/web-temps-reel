<template>
    <div class="flex-column h-screen align-content-center bg-red-100">
        <h1>
            Bienvenue sur la plateforme d'échange ....
        </h1>
        <v-card
            title="Se connecter"
            class="border flex-column w-64"
        >
            <input type="text" value="test">
            <v-input type="text"/>
            <v-card-actions>
                <v-btn>Connexion</v-btn>
            </v-card-actions>
            <v-btn>Connexion</v-btn>
            <v-alert text="..."/>
        </v-card>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>