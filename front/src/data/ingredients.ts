export interface Ingredients {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  contents: string;
}

const IngredientsList: Ingredients[] = [
  {
    contents: 'contents',
    fromName: 'Matt Chorsey',
    subject: 'New event: Trip to Vegas',
    date: '',
    id: 0
  },
  {
    contents: 'contents',
    fromName: 'Lauren Ruthford',
    subject: 'Long time no chat',
    date: '6:12 AM',
    id: 1
  },
  {
    contents: 'contents',
    fromName: 'Jordan Firth',
    subject: 'Report Results',
    date: '4:55 AM',
    id: 2

  },
  {
    contents: 'contents',
    fromName: 'Bill Thomas',
    subject: 'The situation',
    date: 'Yesterday',
    id: 3
  },
  {
    contents: 'contents',
    fromName: 'Joanne Pollan',
    subject: 'Updated invitation: Swim lessons',
    date: 'Yesterday',
    id: 4
  },
  {
    contents: 'contents',
    fromName: 'Andrea Cornerston',
    subject: 'Last minute ask',
    date: 'Yesterday',
    id: 5
  },
  {
    contents: 'contents',
    fromName: 'Moe Chamont',
    subject: 'Family Calendar - Version 1',
    date: 'Last Week',
    id: 6
  },
  {
    contents: 'contents',
    fromName: 'Kelly Richardson',
    subject: 'Placeholder Headhots',
    date: 'Last Week',
    id: 7
  }
];

export const getIngredientsList = () => IngredientsList;

export const getIngredients = (id: number) => IngredientsList.find(m => m.id === id);