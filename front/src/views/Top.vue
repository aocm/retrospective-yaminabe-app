<template>
  <ion-page>
    <ion-content fullscreen="true">
      <ion-grid fixed>
        <ion-toolbar>
          <ion-title style="text-align: center;">
            <ion-card>
              <ion-card-header>
                <ion-card-title id="id_title">ふりかえり闇鍋をはじめます</ion-card-title>
                <img src="https://files.speakerdeck.com/presentations/4c1db6dc7c214b1eba37ea822fedfc6d/slide_61.jpg" />
              </ion-card-header>

              <ion-card-content>
                <h1>説明</h1>
                <ol style="text-align: left;" >
                  <li>
                    データを投入します。
                  </li>
                  <li>
                    ランダムPICKUPボタンを利用して表示します。
                  </li>
                  <li>
                    表示された人はテーマについて話してもらいます。
                  </li>
                  <li>
                    他の人はフィードバックもしくはよかったことを伝えます。
                  </li>
                </ol>
                  
              </ion-card-content>
            </ion-card>
            <ion-button
              id="id_gotohome_button"
              @click="() => router.push('/home')"
            >
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