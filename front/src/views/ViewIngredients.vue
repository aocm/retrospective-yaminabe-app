<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="ingredients">
      <ion-grid fixed>
        <ion-item>
          <ion-icon :icon="personCircle" color="primary"></ion-icon>
          <ion-label class="ion-text-wrap">
            <h2>
              {{ ingredients.fromName }}
              <span class="buttons">
                <span>{{ingredients.read? "既読済み" : "未読" + " 状態 / "}}</span>
                <ion-button v-if="ingredients.read" @click="onUnRead" color="tertiary">UNREAD</ion-button>
                <ion-button v-else @click="onRead">READ</ion-button>
                <!-- <ion-note>{{ ingredients.date }}</ion-note> -->
              </span>
            </h2>
          </ion-label>
        </ion-item>
        
        <div class="ion-padding">
          <h1>{{ ingredients.subject }}</h1>
          <p style="white-space: pre-wrap;">{{ingredients.contents}}</p>
        </div>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonToolbar } from '@ionic/vue';
import { personCircle } from 'ionicons/icons';
import { defineComponent, computed } from 'vue';
import { useStore } from "vuex"
import Ingredients  from '../domain/ingredients'

export default defineComponent({
  name: 'ViewIngredients',

  setup() {
    const route = useRoute();
    const store = useStore()
    const ingredients = new Ingredients(store, route)
    // const ingredients = getIngredients(parseInt(route.params.id as string, 10));
    // TODO 過剰なリフレッシュになるため、タイミングの最適化
    if(!store.getters.findById(Number(route.params.id))){
      store.dispatch("refresh")
    }

    return {
      personCircle,
      route,
      store,
      onRead: ingredients.read,
      onUnRead: ingredients.unread,
      ingredients: ingredients.item,
      getBackButtonText: () => {
        const win = window as any;
        const mode = win && win.Ionic && win.Ionic.mode;
        return mode === 'ios' ? 'Inbox' : '';
      }
    }
  },
  components: {
    IonBackButton,
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    // IonNote,
    IonPage,
    IonToolbar,
  },
});
</script>

<style scoped>
ion-item {
  --inner-padding-end: 0;
  --background: transparent;
}

ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

ion-item h2 {
  font-weight: 600;
}

ion-item .buttons {
  float: right;
  align-items: center;
  display: flex;
}

ion-item ion-icon {
  font-size: 42px;
  margin-right: 8px;
}

ion-item ion-note {
  font-size: 15px;
  margin-right: 12px;
  font-weight: normal;
}

h1 {
  margin: 0;
  font-weight: bold;
  font-size: 22px;
}

p {
  line-height: 22px;
}
</style>