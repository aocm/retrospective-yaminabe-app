import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store, MutationTree, ActionTree,GetterTree } from 'vuex';
import { Ingredients } from '@/data/ingredients';


export interface State {
  ingredientsList: Ingredients[];
}

export const key: InjectionKey<Store<State>> = Symbol();
const state: State = {
  ingredientsList: [
  ],
};

const getters: GetterTree<State, any> = {
  size: (state: State) => {
    return state.ingredientsList.length;
  },
  finishedCount: (state: State) => {
    return state.ingredientsList.filter(i => i.read).length;
  },
  allItem: (state: State) => {
    return state.ingredientsList;
  },
  finishedList: (state: State) => {
    return state.ingredientsList.filter(i => i.read);
  },
  unreadList: (state: State) => {
    return state.ingredientsList.filter(i => !i.read);
  },
  findById: (state) => (id: number)=> state.ingredientsList.find(i => i.id === id)
};

/*
 * Mutations
 * How we mutate our state.
 * Mutations must be synchronous
 */
export const enum MUTATIONS {
  ADD =  'ADD',
  READ = 'READ',
  REFRESH = 'REFRESH',
}
const mutations: MutationTree<State> = {
  [MUTATIONS.ADD](state: any, newitem: Ingredients) {
    state.ingredientsList.push({ ...newitem });
  },
  [MUTATIONS.READ](state: any, item: Ingredients) {
    const ogIndex = state.ingredientsList.findIndex((i: Ingredients) => i.id === item.id)
    state.ingredientsList[ogIndex].read = true;
  },
  [MUTATIONS.REFRESH](state: any, items: Ingredients[]) {
    state.ingredientsList = items;
  },
};

const API_BASE = `${window.origin}/api` // TODO 環境変数
const actions: ActionTree<State, any> = {
  refresh: async ({commit})=>{
    await fetch(`${API_BASE}/ingredients`)
      .then((res) => res.json())
      .then((json) => {
        commit(MUTATIONS.REFRESH, json);
      });
  },
  
  /**
   * 既読にする機能
   */
  read: async ({dispatch}, data: Ingredients)=>{
    data.read = true;
    await fetch(`${API_BASE}/ingredients/${data.id}`,{
      method:'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    }).then(() => dispatch("refresh"))
  },

  /**
   * 未読に戻す機能
   */
  unread: async ({dispatch}, data: Ingredients)=>{
    data.read = false;
    await fetch(`${API_BASE}/ingredients/${data.id}`,{
      method:'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    }).then(() => dispatch("refresh"))
  },

  fetchIngredients: async ({dispatch}, id: number)=>{
    return await fetch(`${API_BASE}/ingredients/${id}`).then((res) => res.json())
  },

  createIngredients: async ({dispatch}, data: Ingredients)=>{
    await fetch(`${API_BASE}/ingredients`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    }).then(() => dispatch("refresh"))
    
  },
};

export const store = createStore<State>({
  state,
  actions,
  mutations,
  getters

 });

// our own `useStore` composition function for types
export function useStore() {
  return baseUseStore(key);
}