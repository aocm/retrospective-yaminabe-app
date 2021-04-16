
import { computed } from 'vue';

class Ingredients {
  constructor(store: any, route: any){
    this.store = store
    this.route = route
  }
  store: any;
  route: any;

  read = () => {
    this.store.dispatch("read", this.store.getters.findById(Number(this.route.params.id)))
  }
  unread = () => {
    this.store.dispatch("unread", this.store.getters.findById(Number(this.route.params.id)))
  }
  refresh = () => {
    this.store.dispatch("refresh")
  }
  item = computed(() => this.store.getters.findById(Number(this.route.params.id)))
  ingredientsList = computed(() => this.store.getters.allItem)
  unreadList = computed(() => this.store.getters.unreadList)
  finishedCount = computed(() => this.store.getters.finishedCount)

}

export default Ingredients
