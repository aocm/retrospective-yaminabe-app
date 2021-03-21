export interface Ingredients {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  contents: string;
  read: boolean;
}

const state: {ingredientsList: Ingredients[]} = {ingredientsList: []};

export const getIngredientsList = () => state.ingredientsList;

export const fetchIngredients = async () => {
  const data = await fetch("http://localhost:3000/ingredients").then(r=>r.json());
  console.log(data)
  state.ingredientsList = data
  console.log(state)
  return data
};

export const readAction = async (data: Ingredients) => {
  data.read = true;
  const res = await fetch(`http://localhost:3000/ingredients/${data.id}`,{
    method:'put',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) 
  }).then( r => r.json());
  console.log(res)
  return data
};

export const getIngredients = (id: number) => state.ingredientsList.find(m => m.id === id);