import { Injectable } from '@angular/core';

export interface AutocompleteItem {
  id: number;
  name: string;
  category: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  private readonly items: AutocompleteItem[] = [
    { id: 1, name: 'Apple', category: 'Fruit', description: 'A red or green fruit' },
    { id: 2, name: 'Banana', category: 'Fruit', description: 'A yellow tropical fruit' },
    { id: 3, name: 'Orange', category: 'Fruit', description: 'A citrus fruit' },
    { id: 4, name: 'Strawberry', category: 'Fruit', description: 'A red berry' },
    { id: 5, name: 'Grape', category: 'Fruit', description: 'Small round fruit' },
    { id: 6, name: 'Carrot', category: 'Vegetable', description: 'An orange root vegetable' },
    { id: 7, name: 'Broccoli', category: 'Vegetable', description: 'A green vegetable' },
    { id: 8, name: 'Tomato', category: 'Vegetable', description: 'A red fruit often used as a vegetable' },
    { id: 9, name: 'Potato', category: 'Vegetable', description: 'A starchy tuber' },
    { id: 10, name: 'Lettuce', category: 'Vegetable', description: 'A leafy green' },
    { id: 11, name: 'Chicken', category: 'Meat', description: 'Poultry meat' },
    { id: 12, name: 'Beef', category: 'Meat', description: 'Red meat from cattle' },
    { id: 13, name: 'Pork', category: 'Meat', description: 'Meat from pigs' },
    { id: 14, name: 'Salmon', category: 'Fish', description: 'A pink fish' },
    { id: 15, name: 'Tuna', category: 'Fish', description: 'A large fish' },
    { id: 16, name: 'Bread', category: 'Bakery', description: 'Baked dough' },
    { id: 17, name: 'Croissant', category: 'Bakery', description: 'A French pastry' },
    { id: 18, name: 'Bagel', category: 'Bakery', description: 'A ring-shaped bread' },
    { id: 19, name: 'Milk', category: 'Dairy', description: 'A white liquid' },
    { id: 20, name: 'Cheese', category: 'Dairy', description: 'A dairy product' },
    { id: 21, name: 'Yogurt', category: 'Dairy', description: 'Fermented milk' },
    { id: 22, name: 'Butter', category: 'Dairy', description: 'A dairy spread' },
    { id: 23, name: 'Rice', category: 'Grain', description: 'A cereal grain' },
    { id: 24, name: 'Pasta', category: 'Grain', description: 'Italian noodles' },
    { id: 25, name: 'Quinoa', category: 'Grain', description: 'A superfood grain' }
  ];

  async search(query: string, delay: number = 500): Promise<AutocompleteItem[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, delay));

    if (!query || query.trim().length === 0) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return this.items.filter(item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      (item.description && item.description.toLowerCase().includes(lowerQuery))
    );
  }
}

