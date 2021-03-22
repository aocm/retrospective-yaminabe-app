<template>
  <ion-header>
    <ion-toolbar>
    <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-item>
    <ion-label position="stacked">投稿者</ion-label>
    <ion-input name="fromName" v-model="fromName"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label position="stacked">タイトル</ion-label>
    <ion-input v-model="subject"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label position="stacked">内容</ion-label>
    <ion-textarea v-model="contents"></ion-textarea>
  </ion-item>
  <ion-footer>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="dismiss">
          <strong>キャンセル</strong>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button color="secondary" @click="onSend">
          <strong>投稿</strong>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-footer>
<!-- 
  [vue/no-multiple-template-root]
  vue3からトップレベル要素は一つでなくても動くなった模様
-->
</template>

<script>
import {
  IonContent, 
  IonInput,
  IonTextarea,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  modalController
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputForm',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      contents: '',
      fromName: '',
      subject: '',
    }
  },
  methods:{
    dismiss(){
      // TODO 型定義したい
      modalController.dismiss({
          cancel: true
        });
    },
    onSend(){
      // TODO 型定義したい
      modalController.dismiss({
          cancel: false,
          id: null,
          date: null,
          contents: this.contents,
          fromName: this.fromName,
          subject: this.subject,
          read: false,
        });
    }
  },
  components: { 
    IonInput, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButtons,
    IonTextarea
  }
});
</script>