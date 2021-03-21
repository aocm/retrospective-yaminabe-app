<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{`終了 ${finishedList.length} / 全体 ${ingredientsList.length} 件`}}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button :text="'戻る'" default-href="/home"></ion-back-button>
        </ion-buttons>

        <ion-title>Buttons</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <IngredientsItem v-for="ingredients in finishedList" :key="ingredients.id" :ingredients="ingredients" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">

import { IonContent, IonHeader,IonBackButton, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/vue';
import IngredientsItem from '@/components/IngredientsItem.vue';
import { defineComponent } from 'vue';
import { getIngredientsList,getFinishedList } from '@/data/ingredients';

export default defineComponent({
  name: 'Home',
  setup() {
    return {
      ingredientsList: getIngredientsList(),
      finishedList: getFinishedList()
    }
  },
  methods: {
    refresh: (ev: CustomEvent) => {
      setTimeout(() => {
        ev.detail.complete();
      }, 3000);
    }
  },
  components: {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IngredientsItem,
  },
});
</script>