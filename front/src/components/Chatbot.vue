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
        <v-card-title>Hi there!</v-card-title>
        <v-tooltip location="left" text="Réduire">
          <template v-slot:activator="{ props }">
            <v-btn @click="menu = false" flat size="small" icon v-bind="props" class="mx-3"><v-icon>mdi-window-minimize</v-icon></v-btn>
          </template>
        </v-tooltip>
      </v-row>
      <v-row no-gutters align="center">
        <v-card-subtitle>We're online!</v-card-subtitle><v-icon size="14" color="green">mdi-circle</v-icon>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <v-row no-gutters justify="start">
        <div class="mx-3 my-1 custom-bot-message">Hi There! I'm MotoCylce Bot <v-icon class="ml-4">mdi-robot</v-icon></div>
        <div class="mx-3 my-1 custom-bot-message">How can I help you ?</div>
      </v-row>
      <div v-for="(message, index) in conversation" :key="index">
        <v-row v-if="message.type === 'bot'" no-gutters justify="start">
          <div class="mx-3 my-1 custom-bot-message">{{ message.content }}</div>
        </v-row>
        <v-row v-if="message.type === 'customer'" no-gutters justify="end">
          <div class="mx-3 my-1 custom-customer-message">{{ message.content }}</div>
        </v-row>
      </div>
      <v-row v-show="showLoader" no-gutters justify="start">
          <div class="mx-3 my-1 custom-bot-message">
            <v-progress-circular
            indeterminate
            color="blue"
            ></v-progress-circular>
          </div>
      </v-row>
      <div v-for="(choice, index) in choicesList" :key="index">
        <v-row v-if="choicesList.length > 1" no-gutters justify="end">
          <v-btn @click="addToConversation([{type:'customer', content:  choice.text }], false);step = 1; clearChoices(); nextBotQuestion(choice.text);" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded><v-icon class="mr-3" color="blue">{{ choice.icon }}</v-icon>{{choice.text}}</v-btn>
        </v-row>
      </div>
      <v-row v-if="restartConversation || step === 0" no-gutters justify="end">
        <v-btn @click="addToConversation([{ type: 'customer', content: 'Maintenance of my vehicle' }], false); addToConversation([{ type: 'bot', content: 'What year is your vehicle?' }], true); restartConversation = false; step++" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded><v-icon class="mr-3" color="blue">mdi-tools</v-icon>Maintenance of my vehicle</v-btn>
        <v-btn @click="addToConversation([{type: 'customer', content: 'Information about my vehicle'},{type: 'bot', content: 'What is your type of use?'}], false); addToChoices([{icon: 'mdi-road-variant', text: 'Road use'}, {icon: 'mdi-terrain', text: 'Off-road use'}, {icon: 'mdi-motorbike', text: 'Sports use'}]); restartConversation = false; step++" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded><v-icon class="mr-3" color="blue">mdi-information</v-icon>Information about my vehicle</v-btn>
        <v-btn @click="addToConversation([{type: 'customer', content: 'Contact'},{type: 'bot', content: 'What do you need?'}], true); addToChoices([{icon: 'mdi-email', text: 'Email'}, {icon: 'mdi-phone', text: 'Phone'}]); restartConversation = false; step++" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded><v-icon class="mr-3" color="blue">mdi-phone</v-icon>Contact</v-btn>
      </v-row>
      <div v-if="conversation[conversation.length - 1]?.content === 'What year is your vehicle?'">
        <v-text-field v-model="customerInputYear" hide-details clearable label="Type the year of your vehicle..." class="ma-3" type="number"></v-text-field>
        <v-row no-gutters justify="end">
          <v-btn @click="yearOfTheVehicle = customerInputYear; addToConversation([{type: 'customer', content: yearOfTheVehicle}], false); nextBotQuestion('What year is your vehicle?')" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded>Confirm</v-btn>
        </v-row>
      </div>
      <div v-if="conversation[conversation.length - 1]?.content === 'When was the last maintenance?'">
        <v-row no-gutters justify="center">
          <v-date-picker v-model="customerInputMaintenance" inputDateTime locale="en" class="ma-3" />
        </v-row>
        <v-row no-gutters justify="end">
          <v-btn @click="dateOfTheLastMaintenance = customerInputMaintenance; checkDateOfTheLastMaintenance(dateOfTheLastMaintenance)" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded>Confirm</v-btn>
        </v-row>
      </div>
      <v-row v-if="step !== 0" no-gutters justify="end">
        <v-btn @click="step = 0; restartConversation = true; addToConversation([{type:'customer', content: 'Bot restarted'}], false); addToConversation([{type: 'bot', content: 'How can I help you?'}], false);" class="mx-3 my-1 custom-choice-btn text-blue" flat rounded><v-icon class="mr-3" color="blue">mdi-restart</v-icon>Restart bot</v-btn>
      </v-row>
    </v-card>
  </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
      interface Conversation {
        type: string
        content: string | number
      }
      const showLoader = ref(false)
      const menu = ref(false)
      const conversation = ref<Conversation[]>([])
      const choicesList = ref<Choice[]>([])
      const step = ref(0)
      const restartConversation = ref(false)
      const customerInputYear = ref<number>(0)
      const customerInputMaintenance = ref<Date>(new Date())
      const yearOfTheVehicle = ref<number>(0)
      const dateOfTheLastMaintenance = ref<Date>(new Date())

    interface Message {
        type: string
        content: string | number
    }

    function addToConversation(messages: Message[], fakeDelay: boolean) {
      if (fakeDelay) {
        showLoader.value = true;
        setTimeout(() => {
          showLoader.value = false;
          addToConversation(messages, false);
        }, Math.floor(Math.random() * 3000));
      } else {
        messages.forEach(message => {
        conversation.value.push({type: message.type, content: message.content})
      })
      }
    }

    interface Choice {
        icon: string
        text: string
      }
  
    function addToChoices(choices: Choice[]) {
      choices.forEach(choice => {
        choicesList.value.push({icon: choice.icon, text: choice.text})
      })
    }

    function clearChoices() {
      choicesList.value.splice(0, choicesList.value.length);
    }

    function nextBotQuestion(text: string) {
      switch (text) {
        case 'Road use':
          addToConversation([{type: 'bot', content: "We offer you a test drive! All you have to do is make an appointment."}], true)
          break;
        case 'Off-road use':
          conversation.value.push({type: 'bot', content: "We offer you an off-road test drive! All you have to do is make an appointment."})
          break;
        case 'Sports use':
          conversation.value.push({type: 'bot', content: "We offer you a sports use test drive! All you have to do is make an appointment."})
          break;
        case "Email":
          conversation.value.push({type: 'bot', content: "Contact us at motocycleenergy@gmail.com"})
          break;
        case "Phone":
          conversation.value.push({type: 'bot', content: "Contact us at 06 77 77 77 77"})
          break;
        case "What year is your vehicle?":
          conversation.value.push({type: 'bot', content: "When was the last maintenance?"})
          break;
      }
    }

    function formatDate(dateString: Date): string {
            const date = new Date(dateString);
            return date.toLocaleString('en', 
                {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric", 
                    // hour: "2-digit",
                    // minute: "2-digit"
                })
    }

    function getDateOneYearAgo() {
      const date = new Date();
      date.setFullYear(date.getFullYear() -1)
      return date
    }

    function checkDateOfTheLastMaintenance(date: Date) {
      if (date < getDateOneYearAgo()) {
        addToConversation([{type: 'customer', content: formatDate(date)}], true)
        console.log('Last maintenance of the vehicle is older than one year ago')
        addToConversation([{type: 'bot', content: 'The vehicle has been serviced for more than a year ! Are you kidding ?'}], true)
        addToConversation([{type: 'bot', content: 'Please select a date for an appointment'}], false)
        // give week disponibility
      } else {
        addToConversation([{type: 'customer', content: formatDate(date)}], false)
        addToConversation([{type: 'bot', content: 'Ok the last maintenance was this year, but how many kilometres have you travelled since the last maintenance?'}], true)
        console.log(getDateOneYearAgo())
        console.log(date)
      }
    }

      return {
        showLoader,
        menu,
        conversation,
        step,
        addToConversation,
        restartConversation,
        choicesList,
        clearChoices,
        nextBotQuestion,
        customerInputYear,
        customerInputMaintenance,
        yearOfTheVehicle,
        dateOfTheLastMaintenance,
        formatDate,
        checkDateOfTheLastMaintenance,
        getDateOneYearAgo,
        addToChoices,
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