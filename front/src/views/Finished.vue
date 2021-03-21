<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{`終了 ${finishedList.length} / 全体 ${ingredientsList.length} 件`}}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button :text="'戻る'" default-href="/home"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-grid fixed >

      <ion-list>
        <IngredientsItem v-for="ingredients in finishedList" :key="ingredients.id" :ingredients="ingredients" />
      </ion-list>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">

import { IonContent, IonHeader, IonBackButton, IonButtons, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar,IonGrid  } from '@ionic/vue';
import IngredientsItem from '@/components/IngredientsItem.vue';
import { defineComponent } from 'vue';
import { getIngredientsList, getFinishedList, fetchIngredients } from '@/data/ingredients';

export default defineComponent({
  name: 'Home',
  setup() {
    return {
      ingredientsList: getIngredientsList(),
      finishedList: getFinishedList()
    }
  },
  methods: {
    async refresh(ev: CustomEvent){
      await fetchIngredients()
      ev.detail.complete();
    },
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
    IonButtons,
    IngredientsItem,
    IonGrid 
  },
});
</script>