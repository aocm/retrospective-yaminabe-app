<template>
  <ion-item v-if="ingredients" :routerLink="'/ingredients/' + ingredients.id" :detail="false" class="list-item">
    <div slot="start" :class="!ingredients.read ? 'dot dot-unread' : 'dot'"></div>
    <ion-label class="ion-text-wrap">
      <h2>
        {{ ingredients.fromName }}
      </h2>
      <h3>{{ ingredients.subject }}</h3>
      <p>
        {{ ingredients.contents }}
      </p>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IngredientsListItem',
  components: {
    IonItem,
    IonLabel,
  },
  props: {
    ingredients: Object,
  },
  methods: {
  },
});
</script>

<style scoped>
.list-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.list-item ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

.list-item  h2 {
  font-weight: 600;
  margin: 0;
}

.list-item p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 95%;
}

.list-item .date {
  float: right;
  align-items: center;
  display: flex;
}

.list-item ion-icon {
  color: #c9c9ca;
}

.list-item ion-note {
  font-size: 15px;
  margin-right: 8px;
  font-weight: normal;
}

.list-item ion-note.md {
  margin-right: 14px;
}

.list-item .dot {
  display: block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  align-self: start;
  margin: 16px 10px 16px 16px;
}

.list-item .dot-unread {
  background: var(--ion-color-primary);
}
</style>