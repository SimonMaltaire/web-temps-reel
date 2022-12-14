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
      <v-row no-gutters align="center">
        <v-card-subtitle>Nous sommes en ligne</v-card-subtitle><v-icon size="14" color="green">mdi-circle</v-icon>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <v-row no-gutters justify="start">
        <div class="mx-3 my-1 custom-bot-message">Bonjour ! Je suis MotoCylce Bot <v-icon class="ml-4">mdi-robot</v-icon></div>
        <div class="mx-3 my-1 custom-bot-message">Dites moi en quoi puis-je vous aider ?</div>
      </v-row>
      <div v-for="(message, index) in conversation" :key="index">
        <v-row v-if="message.type === 'bot'" no-gutters justify="start">
          <div class="mx-3 my-1 custom-bot-message">{{ message.content }}</div>
        </v-row>
        <v-row v-if="message.type === 'customer'" no-gutters justify="end">
          <div class="mx-3 my-1 custom-customer-message">{{ message.content }}</div>
        </v-row>
      </div>
      <div v-for="(choice, index) in choices" :key="index">
        <v-row v-if="choices.length > 1" no-gutters justify="end">
          <v-btn @click="step = 1; addToConversation('customer', choice.text); clearChoices(); nextBotQuestion(choice.text)" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded><v-icon class="mr-3" color="blue">{{ choice.icon }}</v-icon>{{choice.text}}</v-btn>
        </v-row>
      </div>
      <v-row v-if="restartConversation || step === 0" no-gutters justify="end">
        <v-btn @click="maintenanceScenario(); restartConversation = false;" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded><v-icon class="mr-3" color="blue">mdi-tools</v-icon>Entretien de mon véhicule</v-btn>
        <v-btn @click="informationScenario(); restartConversation = false" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded><v-icon class="mr-3" color="blue">mdi-information</v-icon>Information sur mon véhicule</v-btn>
        <v-btn @click="contactScenario(); restartConversation = false" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded><v-icon class="mr-3" color="blue">mdi-phone</v-icon>Contact</v-btn>
      </v-row>
      <div v-if="conversation[conversation.length - 1]?.content === 'Quelle est l\'année de votre véhicule ?'">
        <v-text-field v-model="customerInputYear" hide-details clearable label="Entrez l'année du véhicule..." class="ma-3" type="number"></v-text-field>
        <v-row no-gutters justify="end">
          <v-btn @click="yearOfTheVehicle = customerInputYear; addToConversation('customer', yearOfTheVehicle); nextBotQuestion('Quelle est l\'année de votre véhicule ?')" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded>Confirmer</v-btn>
        </v-row>
      </div>
      <div v-if="conversation[conversation.length - 1]?.content === 'Quelle est la date du dernier entretien ?'">
        <v-row no-gutters justify="center">
          <v-date-picker v-model="customerInputMaintenance" class="ma-3" />
        </v-row>
        <v-row no-gutters justify="end">
          <v-btn @click="dateOfTheLastMaintenance = customerInputMaintenance; addToConversation('customer', dateOfTheLastMaintenance);" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded>Confirmer</v-btn>
        </v-row>
      </div>
      <v-row v-if="step !== 0" no-gutters justify="end">
        <v-btn @click="step = 0; restartConversation = true; addToConversation('customer', 'Scénario redémarré');" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded><v-icon class="mr-3" color="blue">mdi-restart</v-icon>Redémarrer le scénario</v-btn>
      </v-row>
    </v-card>
  </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {

      interface Choice {
        icon: string
        text: string
      }
      interface Conversation {
        type: string
        content: string | number
      }
      const menu = ref(true)
      const conversation = ref<Conversation[]>([])
      const choices = ref<Choice[]>([])
      const step = ref(0)
      const restartConversation = ref(false)
      const customerInputYear = ref<number | string>('')
      const customerInputMaintenance = ref<number | string>('')
      const yearOfTheVehicle = ref<number | string >(0)
      const dateOfTheLastMaintenance = ref<number | string >(0)

    function maintenanceScenario() {
      step.value++
      conversation.value.push({type: 'customer', content: "Entretien de mon véhicule"},{type: 'bot', content: "Quelle est l'année de votre véhicule ?"})
    }

    function informationScenario() {
      step.value++
      conversation.value.push({type: 'customer', content: "Information sur mon véhicule"},{type: 'bot', content: "Quel est votre type d'usage ?"})
      choices.value.push({icon: 'mdi-road-variant', text: "Usage routier"}, {icon: 'mdi-terrain', text: "Usage tout-terrain"}, {icon: 'mdi-motorbike', text: "Usage sportif"})
    }

    function contactScenario() {
      step.value++
      conversation.value.push({type: 'customer', content: "Contact"},{type: 'bot', content: "Que recherchez-vous ?"})
      choices.value.push({icon: 'mdi-email', text: "L'email"}, {icon: 'mdi-phone', text: "Le numéro de téléphone"})
    }

    function addToConversation(type: string, message: string | number) {
      conversation.value.push({type: type, content: message})
    }

    function clearChoices() {
      choices.value.splice(0, choices.value.length);
    }

    function nextBotQuestion(text: string) {
      switch (text) {
        case 'Usage routier':
          conversation.value.push({type: 'bot', content: "Nous vous proposons un essai routier ! Vous n'avez plus qu'à prendre rendez-vous."})
          break;
        case 'Usage tout-terrain':
          conversation.value.push({type: 'bot', content: "Nous vous proposons un essai tout-terrain ! Vous n'avez plus qu'à prendre rendez-vous."})
          break;
        case 'Usage sportif':
          conversation.value.push({type: 'bot', content: "Nous vous proposons un essai sportif ! Vous n'avez plus qu'à prendre rendez-vous."})
          break;
        case "L'email":
          conversation.value.push({type: 'bot', content: "Contactez nous via motocycleenergy@gmail.com"})
          break;
        case "Le numéro de téléphone":
          conversation.value.push({type: 'bot', content: "Contactez nous au 06 77 77 77 77"})
          break;
        case "Quelle est l\'année de votre véhicule ?":
          conversation.value.push({type: 'bot', content: "Quelle est la date du dernier entretien ?"})
          break;
      }
    }

      return {
        menu,
        conversation,
        maintenanceScenario,
        informationScenario,
        contactScenario,
        step,
        addToConversation,
        restartConversation,
        choices,
        clearChoices,
        nextBotQuestion,
        customerInputYear,
        customerInputMaintenance,
        yearOfTheVehicle,
        dateOfTheLastMaintenance,
      }
    }
})
</script>

<style scoped>
.v-btn {
  text-transform: none;
  text-decoration: none;
}
.custom-choice-btn {
  border: solid;
  border-width: 1px;
  border-color: blue;
}
.custom-bot-message, .custom-customer-message {
  border-radius: 25px;
  padding: 8px 14px 8px 14px;
  font-size: 16px;
}
.custom-bot-message {
  background-color: lightgray;
}
.custom-customer-message {
  background-color: blue;
  color: white;
}

</style>