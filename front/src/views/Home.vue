<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>
          <ion-button
            id="id_random_pickup_button"
            color="secondary" @click="randomPickup"
          >
            ランダムPICK UP
          </ion-button>
        </ion-title>
        <ion-title>
          {{`既読 ${finishedCount} / 全体 ${ingredientsList.length} 件`}}
        </ion-title>
        <ion-buttons slot="start">
          <ion-back-button :text="'戻る'" default-href="/"></ion-back-button>
          <ion-button @click="onRefresh">
            <strong>refresh</strong>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="primary">
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button
            id="goto_finished"
            @click="() => router.push('/finished')"
          >Done</ion-button>
        </ion-buttons>

      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-grid fixed>
        <ion-list>
          <IngredientsItem
            v-for="ingredients in ingredientsList.filter(i => !i.read)" 
            :key="ingredients.id" 
            :ingredients="ingredients" 
          />
        </ion-list>
      </ion-grid>
    </ion-content>
    
    <ion-footer>
      <ion-toolbar>
        <ion-title>
          <ion-button id="add_form" color="secondary" @click="openModal">
            追加投稿フォーム
          </ion-button>
        </ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader,IonBackButton, IonButtons, IonButton, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar,IonGrid, modalController } from '@ionic/vue';
import IngredientsItem from '@/components/IngredientsItem.vue';
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "vuex"
import InputForm from '@/components/InputForm.vue';
import Ingredients  from '../domain/ingredients'

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    const store = useStore()
    const ingredients = new Ingredients(store, null)
    if(ingredients.ingredientsList.value.length === 0){
      ingredients.refresh()
    }
    return {
      router,
      store,
      ingredientsList: ingredients.ingredientsList,
      finishedCount: ingredients.finishedCount,
      refresh: async (ev: CustomEvent) => {
        await ingredients.refresh()
        ev.detail.complete();
      },
      randomPickup: () => {
        const unread = store.getters.unreadList
        if(unread.length===0)return
        const randomData = unread[Math.floor(Math.random() * unread.length)]
        console.log(randomData)
        store.dispatch("read", randomData)
        router.push(`/ingredients/${randomData.id}`)
      },
      onRefresh: () => store.dispatch("refresh"),
      onRead:(data: any) => {
        store.dispatch("read", data)
      },
      openModal: async ()=>{
        const modal = await modalController
          .create({
            component: InputForm,
            componentProps: {
              title: '追加投稿フォーム',
            },
          })
        modal.present();
        const { data } = await modal.onDidDismiss();
        console.log("onDidDismiss", data)
        if(data.cancel){
          console.log("cancel")

        }else{
          store.dispatch("createIngredients", data)
        }
      }
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
    IonButtons,
    IonButton,
    IngredientsItem,
    IonGrid
  },
});
</script>