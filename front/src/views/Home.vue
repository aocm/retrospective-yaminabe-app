<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{`終了 ${finishedList.length} / 全体 ${ingredientsList.length} 件`}}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button :text="'戻る'" default-href="/"></ion-back-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button @click="() => router.push('/finished')">
            Done
          </ion-button>
        </ion-buttons>

        <ion-title>
          <ion-button @click="refresh">
            refresh
          </ion-button>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <IngredientsItem
          v-for="ingredients in ingredientsList" 
          :key="ingredients.id" 
          :ingredients="ingredients" 
          @click="onRead(ingredients)"
        />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">

import { IonContent, IonHeader,IonBackButton, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/vue';
import IngredientsItem from '@/components/IngredientsItem.vue';
import { defineComponent } from 'vue';
import { getIngredientsList, fetchIngredients, readAction } from '@/data/ingredients';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    return {
      router,
      ingredientsList: getIngredientsList(),
      finishedList: getIngredientsList()
    }
  },

  methods: {
    async refresh(ev: CustomEvent){
      // this.ingredientsList = await fetchIngredients()
      await fetchIngredients()
    },
    async onRead(data: any){
      await readAction(data);
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