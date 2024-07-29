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
          isBestSeller: true,
          options: [
            {
              name: 'Add-ons',
              required: false,
              choices: [
                { id: '1', name: 'Extra Dressing', price: '₦500' },
                { id: '2', name: 'Grilled Chicken', price: '₦1,000' }
              ]
            },
            {
              name: 'Size',
              required: true,
              choices: [
                { id: '1', name: 'Small', price: '₦4,000' },
                { id: '2', name: 'Medium', price: '₦5,000' },
                { id: '3', name: 'Large', price: '₦6,000' }
              ]
            }
          ]
        },
        {
          id: '2',
          name: 'Fruit & Spice Salad',
          description: 'A delightful mix of fruits and spices.',
          price: '₦5,000',
          imageUrl: '/rest/fs.jpg',
          rating: 4.6,
          stars: 5,
          isBestSeller: true,
          options: [
            {
              name: 'Add-ons',
              required: false,
              choices: [
                { id: '1', name: 'Extra Fruit', price: '₦500' },
                { id: '2', name: 'Nuts', price: '₦300' }
              ]
            },
            {
              name: 'Size',
              required: true,
              choices: [
                { id: '1', name: 'Small', price: '₦4,000' },
                { id: '2', name: 'Medium', price: '₦5,000' },
                { id: '3', name: 'Large', price: '₦6,000' }
              ]
            }
          ]
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
          isBestSeller: false,
          options: [
            {
              name: 'Flavors',
              required: true,
              choices: [
                { id: '1', name: 'Vanilla', price: '₦3,000' },
                { id: '2', name: 'Chocolate', price: '₦3,000' },
                { id: '3', name: 'Strawberry', price: '₦3,000' }
              ]
            },
            {
              name: 'Toppings',
              required: false,
              choices: [
                { id: '1', name: 'Sprinkles', price: '₦200' },
                { id: '2', name: 'Chocolate Chips', price: '₦300' }
              ]
            }
          ]
        },
        {
          id: '4',
          name: 'Chocolate Cake',
          description: 'Rich chocolate cake with layers.',
          price: '₦4,000',
          imageUrl: '/rest/cc.jpg',
          rating: 4.9,
          stars: 5,
          isBestSeller: false,
          options: [
            {
              name: 'Add-ons',
              required: false,
              choices: [
                { id: '1', name: 'Extra Frosting', price: '₦500' },
                { id: '2', name: 'Nuts', price: '₦300' }
              ]
            }
          ]
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
          isBestSeller: false,
          options: [
            {
              name: 'Flavors',
              required: true,
              choices: [
                { id: '1', name: 'Berry', price: '₦2,000' },
                { id: '2', name: 'Mango', price: '₦2,000' },
                { id: '3', name: 'Banana', price: '₦2,000' }
              ]
            },
            {
              name: 'Add-ons',
              required: false,
              choices: [
                { id: '1', name: 'Protein Powder', price: '₦500' },
                { id: '2', name: 'Chia Seeds', price: '₦300' }
              ]
            }
          ]
        },
        {
          id: '6',
          name: 'Milkshake',
          description: 'Creamy milkshake with various flavors.',
          price: '₦2,500',
          imageUrl: '/rest/milks.jpg',
          rating: 4.6,
          stars: 5,
          isBestSeller: true,
          options: [
            {
              name: 'Flavors',
              required: true,
              choices: [
                { id: '1', name: 'Vanilla', price: '₦2,500' },
                { id: '2', name: 'Chocolate', price: '₦2,500' },
                { id: '3', name: 'Strawberry', price: '₦2,500' }
              ]
            },
            {
              name: 'Toppings',
              required: false,
              choices: [
                { id: '1', name: 'Whipped Cream', price: '₦200' },
                { id: '2', name: 'Cherry', price: '₦100' }
              ]
            }
          ]
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
    categories: {
      "For You": [
        {
          id: '7',
          name: 'Chicken Salad',
          description: 'Grilled chicken with fresh greens.',
          price: '₦4,500',
          imageUrl: '/rest/cs.jpg',
          rating: 4.4,
          stars: 5,
          isBestSeller: true,
          options: [
            {
              name: 'Add-ons',
              required: false,
              choices: [
                { id: '1', name: 'Extra Chicken', price: '₦1,000' },
                { id: '2', name: 'Cheese', price: '₦500' }
              ]
            },
            {
              name: 'Dressing',
              required: true,
              choices: [
                { id: '1', name: 'Ranch', price: '₦500' },
                { id: '2', name: 'Caesar', price: '₦500' },
                { id: '3', name: 'Vinaigrette', price: '₦500' }
              ]
            }
          ]
        },
        {
          id: '8',
          name: 'Veggie Delight',
          description: 'A mix of seasonal vegetables.',
          price: '₦4,000',
          imageUrl: '/rest/vd.jpg',
          rating: 4.3,
          stars: 4,
          isBestSeller: false,
          options: [
            {
              name: 'Add-ons',
              required: false,
              choices: [
                { id: '1', name: 'Tofu', price: '₦700'},
                  { id: '2', name: 'Avocado', price: '₦600' }
                ]
              },
              {
                name: 'Size',
                required: true,
                choices: [
                  { id: '1', name: 'Small', price: '₦3,000' },
                  { id: '2', name: 'Medium', price: '₦4,000' },
                  { id: '3', name: 'Large', price: '₦5,000' }
                ]
              }
            ]
          }
        ],
        Drinks: [
          {
            id: '9',
            name: 'Lemonade',
            description: 'Refreshing lemonade with a hint of mint.',
            price: '₦1,500',
            imageUrl: '/rest/lemonade.jpg',
            rating: 4.5,
            stars: 4,
            isBestSeller: false,
            options: [
              {
                name: 'Size',
                required: true,
                choices: [
                  { id: '1', name: 'Small', price: '₦1,000' },
                  { id: '2', name: 'Medium', price: '₦1,500' },
                  { id: '3', name: 'Large', price: '₦2,000' }
                ]
              },
              {
                name: 'Add-ons',
                required: false,
                choices: [
                  { id: '1', name: 'Extra Mint', price: '₦200' },
                  { id: '2', name: 'Sugar', price: '₦100' }
                ]
              }
            ]
          },
          {
            id: '10',
            name: 'Iced Tea',
            description: 'Chilled iced tea with lemon.',
            price: '₦1,500',
            imageUrl: '/rest/iced-tea.jpg',
            rating: 4.4,
            stars: 4,
            isBestSeller: false,
            options: [
              {
                name: 'Size',
                required: true,
                choices: [
                  { id: '1', name: 'Small', price: '₦1,000' },
                  { id: '2', name: 'Medium', price: '₦1,500' },
                  { id: '3', name: 'Large', price: '₦2,000' }
                ]
              },
              {
                name: 'Sweetener',
                required: false,
                choices: [
                  { id: '1', name: 'Sugar', price: '₦100' },
                  { id: '2', name: 'Honey', price: '₦200' }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      id: '3',
      name: 'KFC',
      rating: 4.2,
      time: '10-25 mins',
      image: '/rest/kfc1.jpg',
      background: '/rest/kfc1.jpg',
      distance: '1.8KM',
      fee: '$2.50',
      hours: '9am-10pm, Monday to Sunday',
      isBestSeller: true,
      categories: {
        "For You": [
          {
            id: '11',
            name: 'Zinger Burger',
            description: 'Spicy chicken burger with crispy lettuce and mayo.',
            price: '₦3,500',
            imageUrl: '/rest/zinger.jpg',
            rating: 4.6,
            stars: 5,
            isBestSeller: true,
            options: [
              {
                name: 'Add-ons',
                required: false,
                choices: [
                  { id: '1', name: 'Extra Cheese', price: '₦300' },
                  { id: '2', name: 'Bacon', price: '₦400' }
                ]
              },
              {
                name: 'Sides',
                required: false,
                choices: [
                  { id: '1', name: 'Fries', price: '₦1,000' },
                  { id: '2', name: 'Coleslaw', price: '₦800' }
                ]
              }
            ]
          },
          {
            id: '12',
            name: 'Grilled Chicken',
            description: 'Tender and juicy grilled chicken.',
            price: '₦4,000',
            imageUrl: '/rest/grilled-chicken.jpg',
            rating: 4.7,
            stars: 5,
            isBestSeller: true,
            options: [
              {
                name: 'Size',
                required: true,
                choices: [
                  { id: '1', name: 'Quarter', price: '₦3,000' },
                  { id: '2', name: 'Half', price: '₦4,000' },
                  { id: '3', name: 'Whole', price: '₦7,000' }
                ]
              },
              {
                name: 'Sauce',
                required: true,
                choices: [
                  { id: '1', name: 'BBQ', price: '₦500' },
                  { id: '2', name: 'Garlic', price: '₦500' },
                  { id: '3', name: 'Hot', price: '₦500' }
                ]
              }
            ]
          }
        ],
        Drinks: [
          {
            id: '13',
            name: 'Pepsi',
            description: 'Refreshing cola beverage.',
            price: '₦1,000',
            imageUrl: '/rest/pepsi.jpg',
            rating: 4.3,
            stars: 4,
            isBestSeller: false,
            options: [
              {
                name: 'Size',
                required: true,
                choices: [
                  { id: '1', name: 'Small', price: '₦500' },
                  { id: '2', name: 'Medium', price: '₦1,000' },
                  { id: '3', name: 'Large', price: '₦1,500' }
                ]
              },
              {
                name: 'Ice',
                required: false,
                choices: [
                  { id: '1', name: 'No Ice', price: '₦0' },
                  { id: '2', name: 'Extra Ice', price: '₦0' }
                ]
              }
            ]
          },
          {
            id: '14',
            name: 'Orange Juice',
            description: 'Freshly squeezed orange juice.',
            price: '₦2,000',
            imageUrl: '/rest/orange-juice.jpg',
            rating: 4.5,
            stars: 5,
            isBestSeller: false,
            options: [
              {
                name: 'Size',
                required: true,
                choices: [
                  { id: '1', name: 'Small', price: '₦1,500' },
                  { id: '2', name: 'Medium', price: '₦2,000' },
                  { id: '3', name: 'Large', price: '₦2,500' }
                ]
              },
              {
                name: 'Pulp',
                required: false,
                choices: [
                  { id: '1', name: 'With Pulp', price: '₦0' },
                  { id: '2', name: 'No Pulp', price: '₦0' }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      id: '4',
      name: 'Dominos Pizza',
      rating: 4.8,
      time: '5-15 mins',
      image: '/rest/domino.jpg',
      background: '/rest/domino.jpg',
      distance: '2.5KM',
      fee: '$1.00',
      hours: '9am-9pm, Monday to Sunday',
      isBestSeller: true,
      categories: {
        "For You": [
          {
            id: '15',
            name: 'Pasta Primavera',
            description: 'Pasta with fresh vegetables and light sauce.',
            price: '₦5,000',
            imageUrl: '/rest/pasta.jpg',
            rating: 4.9,
            stars: 5,
            isBestSeller: true,
            options: [
              {
                name: 'Add-ons',
                required: false,
                choices: [
                  { id: '1', name: 'Grilled Chicken', price: '₦1,500' },
                  { id: '2', name: 'Shrimp', price: '₦2,000' }
                ]
              },
              {
                name: 'Sauce',
                required: true,
                choices: [
                  { id: '1', name: 'Tomato Basil', price: '₦500' },
                  { id: '2', name: 'Alfredo', price: '₦500' },
                  { id: '3', name: 'Pesto', price: '₦500' }
                ]
              }
            ]
          },
          {
            id: '16',
            name: 'Greek Salad',
            description: 'Salad with feta, olives, and fresh vegetables.',
            price: '₦4,500',
            imageUrl: '/rest/greek-salad.jpg',
            rating: 4.8,
            stars: 5,
            isBestSeller: true,
            options: [
              {
                name: 'Add-ons',
                required: false,
                choices: [
                  { id: '1', name: 'Grilled Chicken', price: '₦1,500' },
                  { id: '2', name: 'Avocado', price: '₦600' }
                ]
              },
              {
                name: 'Dressing',
                required: true,
                choices: [
                  { id: '1', name: 'Vinaigrette', price: '₦300' },
                  { id: '2', name: 'Ranch', price: '₦300' },
                  { id: '3', name: 'Blue Cheese', price: '₦300' }
                ]
              }
            ]
          }
        ],
        Drinks: [
          {
            id: '17',
            name: 'Mango Smoothie',
            description: 'Refreshing smoothie with fresh mangoes.',
            price: '₦2,500',
            imageUrl: '/rest/mango-smoothie.jpg',
            rating: 4.7,
            stars: 5,
            isBestSeller: true,
            options: [
              {
                name: 'Size',
                required: true,
                choices: [
                  { id: '1', name: 'Small', price: '₦2,000' },
                  { id: '2', name: 'Medium', price: '₦2,500' },
                  { id: '3', name: 'Large', price: '₦3,000' }
                ]
              },
              {
                name: 'Add-ons',
                required: false,
                choices: [
                  { id: '1', name: 'Protein Powder', price: '₦500' },
                  { id: '2', name: 'Chia Seeds', price: '₦300' }
                ]
              }
            ]
          },
          {
            id: '18',
            name: 'Herbal Tea',
            description: 'Calming tea with herbal infusion.',
            price: '₦1,500',
            imageUrl: '/rest/herbal-tea.jpg',
            rating: 4.6,
            stars: 5,
            isBestSeller: true,
            options: [
              {
                name: 'Size',
                required: true,
                choices: [
                  { id: '1', name: 'Small', price: '₦1,000' },
                  { id: '2', name: 'Medium', price: '₦1,500' },
                  { id: '3', name: 'Large', price: '₦2,000' }
                ]
              },
              {
                name: 'Sweetener',
                required: false,
                choices: [
                  { id: '1', name: 'Honey', price: '₦200' },
                  { id: '2', name: 'Sugar', price: '₦100' }
                ]
              }
            ]
          }
        ]
      }
    }
  ];