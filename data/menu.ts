import type { Localized } from "@/i18n/config";

export type Suit = "spade" | "heart" | "diamond" | "club";

export type MenuItem = {
  id: string;
  name: string;
  /** Price in CAD. Leave out for build-your-own or upcoming items. */
  price?: number;
  description: Localized;
  image: string;
  /** "Most liked" ranking on Uber Eats. */
  rank?: 1 | 2 | 3;
  comingSoon?: boolean;
};

export type MenuCategory = {
  id: string;
  label: Localized;
  tagline?: Localized;
  suit: Suit;
  items: MenuItem[];
};

// Prices come from the Uber Eats listing (delivery prices — usually a bit higher than in store).
// Descriptions and photos are placeholders for the demo: swap in the owner's wording and real
// photos of each dish before going live.
export const menu: MenuCategory[] = [
  {
    id: "burgers",
    label: { fr: "Burgers", en: "Burgers" },
    tagline: { fr: "Smashés à la commande", en: "Smashed to order" },
    suit: "spade",
    items: [
      {
        id: "cheeseburger",
        name: "Cheeseburger",
        price: 8.45,
        rank: 1,
        image: "/food/cheeseburger.webp",
        description: {
          fr: "Boulette smashée, cheddar fondant, cornichons et oignons. Le classique qui fait l'unanimité.",
          en: "Smashed patty, melty cheddar, pickles and onions. The classic everyone agrees on.",
        },
      },
      {
        id: "double-cheese",
        name: "Double Cheese",
        price: 11.68,
        image: "/food/double-cheese.webp",
        description: {
          fr: "Deux boulettes smashées, double cheddar. Pour les vraies faims.",
          en: "Two smashed patties, double cheddar. For real hunger.",
        },
      },
      {
        id: "joker-burger",
        name: "Joker Burger",
        price: 11.68,
        image: "/food/joker-burger.webp",
        description: {
          fr: "Notre signature : double boulette, cheddar, jalapeños et la fameuse sauce Joker.",
          en: "Our signature: double patty, cheddar, jalapeños and the famous Joker sauce.",
        },
      },
      {
        id: "chicken-burger",
        name: "Chicken Burger",
        price: 11.99,
        image: "/food/chicken-burger.webp",
        description: {
          fr: "Filet de poulet croustillant, laitue, mayo maison.",
          en: "Crispy chicken fillet, lettuce, house mayo.",
        },
      },
    ],
  },
  {
    id: "tacos",
    label: { fr: "Tacos", en: "Tacos" },
    tagline: { fr: "Comme au bled", en: "Just like back home" },
    suit: "heart",
    items: [
      {
        id: "tacos-poulet",
        name: "Tacos Poulet",
        price: 10.38,
        rank: 2,
        image: "/food/tacos-poulet.webp",
        description: {
          fr: "Tortilla grillée à la presse, poulet assaisonné, frites et sauce fromagère.",
          en: "Press-grilled tortilla, seasoned chicken, fries and cheese sauce.",
        },
      },
      {
        id: "tacos-viande",
        name: "Tacos Viande",
        price: 10.38,
        image: "/food/tacos-viande.webp",
        description: {
          fr: "Viande hachée épicée, frites et sauce fromagère qui coule.",
          en: "Spiced ground beef, fries and oozing cheese sauce.",
        },
      },
      {
        id: "tacos-merguez",
        name: "Tacos Merguez",
        price: 10.38,
        image: "/food/tacos-merguez.webp",
        description: {
          fr: "Merguez grillée, frites et sauce fromagère. Ça pique juste ce qu'il faut.",
          en: "Grilled merguez, fries and cheese sauce. Just the right kick.",
        },
      },
      {
        id: "tacos-mix",
        name: "Tacos Mix",
        price: 14.28,
        image: "/food/tacos-mix.webp",
        description: {
          fr: "Poulet, viande et merguez dans un seul tacos. Le combo ultime.",
          en: "Chicken, beef and merguez in one tacos. The ultimate combo.",
        },
      },
    ],
  },
  {
    id: "sandwichs",
    label: { fr: "Sandwichs", en: "Sandwiches" },
    tagline: { fr: "Baguette bien garnie", en: "Loaded baguettes" },
    suit: "diamond",
    items: [
      {
        id: "sandwich-joker",
        name: "Sandwich Joker",
        price: 16.88,
        image: "/food/sandwich-joker.webp",
        description: {
          fr: "Le sandwich signature : généreux, garni de frites et relevé à la sauce Joker.",
          en: "The signature sandwich: loaded, stuffed with fries and kicked up with Joker sauce.",
        },
      },
      {
        id: "sandwich-kefta",
        name: "Sandwich Kefta",
        price: 14.28,
        image: "/food/sandwich-kefta.webp",
        description: {
          fr: "Kefta grillée aux épices, oignons, tomates et sauce harissa.",
          en: "Spiced grilled kefta, onions, tomatoes and harissa sauce.",
        },
      },
      {
        id: "sandwich-merguez",
        name: "Sandwich Merguez",
        price: 14.28,
        image: "/food/sandwich-merguez.webp",
        description: {
          fr: "Merguez grillées, frites et harissa, comme au bled.",
          en: "Grilled merguez, fries and harissa, just like back home.",
        },
      },
      {
        id: "sandwich-boston",
        name: "Sandwich Boston",
        price: 15.58,
        image: "/food/sandwich-boston.webp",
        description: {
          fr: "Poulet grillé, fromage fondu, oignons et sauce crémeuse.",
          en: "Grilled chicken, melted cheese, onions and creamy sauce.",
        },
      },
    ],
  },
  {
    id: "poutines",
    label: { fr: "Poutines", en: "Poutines" },
    tagline: { fr: "Fromage qui fait squick", en: "Squeaky curds, always" },
    suit: "club",
    items: [
      {
        id: "poutine-poulet",
        name: "Poutine Poulet",
        price: 12.98,
        image: "/food/poutine-poulet.webp",
        description: {
          fr: "Frites, fromage en grains, sauce brune et poulet grillé.",
          en: "Fries, cheese curds, gravy and grilled chicken.",
        },
      },
      {
        id: "poutine-merguez",
        name: "Poutine Merguez",
        price: 12.98,
        image: "/food/poutine-merguez.webp",
        description: {
          fr: "La poutine d'ici, version merguez grillée.",
          en: "Québec's classic, topped with grilled merguez.",
        },
      },
      {
        id: "poutine-smoke-meat",
        name: "Poutine Smoke Meat",
        price: 12.98,
        image: "/food/poutine-smoke-meat.webp",
        description: {
          fr: "Frites, fromage en grains, sauce brune et smoked meat montréalais.",
          en: "Fries, cheese curds, gravy and Montreal smoked meat.",
        },
      },
    ],
  },
  {
    id: "bowls",
    label: { fr: "Bowls & assiettes", en: "Bowls & plates" },
    tagline: { fr: "Version assise", en: "Sit-down style" },
    suit: "spade",
    items: [
      {
        id: "joker-bowl",
        name: "Joker Bowl",
        image: "/food/joker-bowl.webp",
        description: {
          fr: "Compose ton bowl : base, protéine, garnitures et sauce. À ta façon.",
          en: "Build your bowl: base, protein, toppings and sauce. Your way.",
        },
      },
      {
        id: "assiette-poulet-grille",
        name: "Assiette Poulet Grillé",
        price: 14.95,
        image: "/food/assiette-poulet-grille.webp",
        description: {
          fr: "Poulet mariné grillé, riz, salade, frites et sauce à l'ail.",
          en: "Marinated grilled chicken, rice, salad, fries and garlic sauce.",
        },
      },
    ],
  },
  {
    id: "specials",
    label: { fr: "Joker Specials", en: "Joker Specials" },
    tagline: { fr: "La carte maîtresse", en: "The trump card" },
    suit: "heart",
    items: [
      {
        id: "special-joker",
        name: "Special Joker",
        price: 22.93,
        rank: 3,
        image: "/food/special-joker.webp",
        description: {
          fr: "Le plus généreux du menu. À partager… ou pas.",
          en: "The most generous thing on the menu. Share it… or don't.",
        },
      },
      {
        id: "philly-steak",
        name: "Philly Steak",
        comingSoon: true,
        image: "/food/philly-steak.webp",
        description: {
          fr: "Steak, fromage fondu, jalapeños et sauce Joker. Bientôt sur le menu.",
          en: "Steak, melted cheese, jalapeños and Joker sauce. Coming soon.",
        },
      },
    ],
  },
];
