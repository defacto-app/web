// data.ts
import { Restaurant } from '@/lib/types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Cold Stone Creamery',
    rating: 4.5,
    time: '5-20 mins',
    image: '/rest/cold.jpg',
    background: '/rest/cold.jpg',
    distance: '2.8KM',
    fee: '$2.00',
    hours: '8am-9pm, Monday to Saturday',
    isBestSeller: false,
    products: [],
    categories: {
      "For You": [
        {
          id: '1',
          name: 'Mixed Vegetable Salad',
          description: 'Fresh veggies with a touch of dressing.',
          price: '₦5,000',
          imageUrl: '/rest/ms.jpg',
          rating: 4.7,
          stars: 5,
          isBestSeller: true
        },
        {
          id: '2',
          name: 'Fruit & Spice Salad',
          description: 'A delightful mix of fruits and spices.',
          price: '₦5,000',
          imageUrl: '/rest/fs.jpg',
          rating: 4.6,
          stars: 5,
          isBestSeller: true
        },
      ],
      Deserts: [
        {
          id: '3',
          name: 'Ice Cream',
          description: 'Cold and sweet ice cream.',
          price: '₦3,000',
          imageUrl: '/rest/ic.jpg',
          rating: 4.8,
          stars: 5,
          isBestSeller: false
        },
        {
          id: '4',
          name: 'Chocolate Cake',
          description: 'Rich chocolate cake with layers.',
          price: '₦4,000',
          imageUrl: '/rest/ic.jpg',

          rating: 4.9,
          stars: 5,
          isBestSeller: false
        },
      ],
      Drinks: [
        {
          id: '5',
          name: 'Smoothie',
          description: 'Refreshing fruit smoothie.',
          price: '₦2,000',
          imageUrl: '/rest/sm.jpg',
          rating: 4.5,
          stars: 4,
          isBestSeller: false
        },
        {
          id: '6',
          name: 'Milkshake',
          description: 'Creamy milkshake with various flavors.',
          price: '₦2,500',
          imageUrl: '/rest/milks.jpg',
          rating: 4.6,
          stars: 5,
          isBestSeller: true
        },
      ],
    },
  },
  {
    id: '2',
    name: 'Mr.Biggs',
    rating: 4.0,
    time: '5-20 mins',
    image: '/rest/biggs.jpg',
    background: '/rest/biggs.jpg',
    distance: '3.2KM',
    fee: '$1.50',
    hours: '8am-10pm, Monday to Sunday',
    isBestSeller: false,
    products: [],
    categories: {
      "For You": [
        {
          id: '7',
          name: 'Chicken Salad',
          description: 'Grilled chicken with fresh greens.',
          price: '₦4,500',
          imageUrl: '/rest/milks.jpg',

          rating: 4.4,
          stars: 5,
          isBestSeller: true
        },
        {
          id: '8',
          name: 'Veggie Delight',
          description: 'A mix of seasonal vegetables.',
          price: '₦4,000',
          imageUrl: '/rest/milks.jpg',

          rating: 4.3,
          stars: 4,
          isBestSeller: false
        },
      ],
      Deserts: [
        {
          id: '9',
          name: 'Pastry',
          description: 'Freshly baked pastry.',
          price: '₦1,500',
          imageUrl: '/rest/sm.jpg',

          rating: 4.1,
          stars: 4,
          isBestSeller: false
        },
        {
          id: '10',
          name: 'Cupcake',
          description: 'Delicious cupcake with frosting.',
          price: '₦1,200',
          imageUrl: '/rest/fs.jpg',

          rating: 4.2,
          stars: 4,
          isBestSeller: false
        },
      ],
      Drinks: [
        {
          id: '11',
          name: 'Soda',
          description: 'Chilled soda drink.',
          price: '₦800',
          imageUrl: '/rest/milks.jpg',

          rating: 3.9,
          stars: 3,
          isBestSeller: false
        },
        {
          id: '12',
          name: 'Iced Tea',
          description: 'Refreshing iced tea.',
          price: '₦1,000',
          imageUrl: '/rest/milks.jpg',

          rating: 4.5,
          stars: 4,
          isBestSeller: false
        },
      ],
    },
  },
  {
    id: '3',
    name: 'Chicken Republic',
    rating: 4.3,
    time: '10-30 mins',
    image: '/rest/chickenrep.jpg',
    background: '/rest/chickenrep.jpg',
    distance: '1.8KM',
    fee: '$2.00',
    hours: '9am-9pm, Monday to Saturday',
    isBestSeller: false,
    products: [],
    categories: {
      "For You": [
        {
          id: '13',
          name: 'Spicy Chicken Salad',
          description: 'Spicy grilled chicken with mixed greens.',
          price: '₦5,500',
          imageUrl: '/rest/fs.jpg',

          rating: 4.8,
          stars: 5,
          isBestSeller: true
        },
        {
          id: '14',
          name: 'Caesar Salad',
          description: 'Classic Caesar salad with a creamy dressing.',
          price: '₦5,000',
          imageUrl: '/rest/fs.jpg',

          rating: 4.7,
          stars: 5,
          isBestSeller: true
        },
      ],
      Deserts: [
        {
          id: '15',
          name: 'Brownie',
          description: 'Chocolate brownie with nuts.',
          price: '₦2,000',
          imageUrl: '/rest/fs.jpg',

          rating: 4.5,
          stars: 4,
          isBestSeller: false
        },
        {
          id: '16',
          name: 'Cheesecake',
          description: 'Creamy cheesecake with a graham crust.',
          price: '₦3,500',
          imageUrl: '/rest/fs.jpg',

          rating: 4.6,
          stars: 5,
          isBestSeller: false
        },
      ],
      Drinks: [
        {
          id: '17',
          name: 'Lemonade',
          description: 'Freshly squeezed lemonade.',
          price: '₦1,500',
          imageUrl: '/rest/fs.jpg',

          rating: 4.2,
          stars: 4,
          isBestSeller: false
        },
        {
          id: '18',
          name: 'Coffee',
          description: 'Hot brewed coffee.',
          price: '₦1,000',
          imageUrl: '/rest/fs.jpg',

          rating: 4.3,
          stars: 4,
          isBestSeller: false
        },
      ],
    },
  },
  {
    id: '4',
    name: 'KFC',
    rating: 4.6,
    time: '5-20 mins',
    image: '/rest/kfc1.jpg',
    background: '/rest/kfc1.jpg',
    distance: '2.0KM',
    fee: '$1.00',
    hours: '10am-10pm, Monday to Sunday',
    isBestSeller: false,
    products: [],
    categories: {
      "For You": [
        {
          id: '19',
          name: 'Zinger Salad',
          description: 'Crispy zinger chicken with fresh veggies.',
          price: '₦6,000',
          imageUrl: '/rest/fs.jpg',

          rating: 4.8,
          stars: 5,
          isBestSeller: true
        },
        {
          id: '20',
          name: 'Coleslaw',
          description: 'Classic KFC coleslaw.',
          price: '₦2,000',
          imageUrl: '/rest/fs.jpg',

          rating: 4.4,
          stars: 4,
          isBestSeller: true
        },
      ],
      Deserts: [
        {
          id: '21',
          name: 'Apple Pie',
          description: 'Warm apple pie.',
          price: '₦2,500',
          imageUrl: '/rest/fs.jpg',

          rating: 4.6,
          stars: 5,
          isBestSeller: false
        },
        {
          id: '22',
          name: 'Chocolate Sundae',
          description: 'Sundae with chocolate sauce.',
          price: '₦2,000',
          imageUrl: '/rest/fs.jpg',

          rating: 4.3,
          stars: 4,
          isBestSeller: false
        },
      ],
      Drinks: [
        {
          id: '23',
          name: 'Pepsi',
          description: 'Chilled Pepsi drink.',
          price: '₦800',
          imageUrl: '/rest/fs.jpg',

          rating: 4.0,
          stars: 4,
          isBestSeller: false
        },
        {
          id: '24',
          name: 'Iced Coffee',
          description: 'Refreshing iced coffee.',
          price: '₦1,500',
          imageUrl: '/rest/fs.jpg',

          rating: 4.2,
          stars: 4,
          isBestSeller: false
        },
      ],
    },
  },
  {
    id: '5',
    name: 'Dominos Pizza',
    rating: 4.7,
    time: '10-30 mins',
    image: '/rest/dominos.jpg',
    background: '/rest/dominos.jpg',
    distance: '1.5KM',
    fee: '$2.00',
    hours: '9am-10pm, Monday to Sunday',
    isBestSeller: false,
    products: [],
    categories: {
      "For You": [
        {
          id: '25',
          name: 'Pepperoni Pizza',
          description: 'Classic pepperoni pizza with mozzarella cheese.',
          price: '₦8,000',
          imageUrl: '/rest/fs.jpg',

          rating: 4.9,
          stars: 5,
          isBestSeller: true
        },
        {
          id: '26',
          name: 'Veggie Pizza',
          description: 'Pizza loaded with fresh vegetables.',
          price: '₦7,500',
          imageUrl: '/rest/fs.jpg',

          rating: 4.7,
          stars: 5,
          isBestSeller: true
        },
      ],
      Deserts: [
        {
          id: '27',
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with a gooey center.',
          price: '₦4,000',
          imageUrl: '/rest/fs.jpg',

          rating: 4.8,
          stars: 5,
          isBestSeller: false
        },
        {
          id: '28',
          name: 'Cinnamon Sticks',
          description: 'Sweet cinnamon sticks with icing dip.',
          price: '₦3,000',
          imageUrl: '/rest/fs.jpg',

          rating: 4.6,
          stars: 4,
          isBestSeller: false
        },
      ],
      Drinks: [
        {
          id: '29',
          name: 'Coca Cola',
          description: 'Chilled Coca Cola drink.',
          price: '₦900',
          imageUrl: '/rest/fs.jpg',

          rating: 4.5,
          stars: 4,
          isBestSeller: false
        },
        {
          id: '30',
          name: 'Sprite',
          description: 'Refreshing Sprite drink.',
          price: '₦900',
          imageUrl: '/rest/fs.jpg',

          rating: 4.4,
          stars: 4,
          isBestSeller: false
        },
      ],
    },
  },
];
