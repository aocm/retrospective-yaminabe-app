<template>
  <ion-page>
    <ion-content fullscreen="true">
      <ion-grid fixed>
        <ion-toolbar>
          <ion-title style="text-align: center;">
            <ion-card>
              <ion-card-header>
                <ion-card-title>ふりかえり闇鍋をはじめます</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                説明【TBA】
              </ion-card-content>
            </ion-card>
            <ion-button @click="() => router.push('/home')">
              会場へ
            </ion-button>
          </ion-title>
        </ion-toolbar>
      </ion-grid>
    </ion-content>
    
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonGrid, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Top',
  setup() {
    const router = useRouter();
    return { router };
  },
  components: {
    IonContent,
    IonGrid,
    IonPage,
    IonTitle,
    IonToolbar,
  },
});
</script>