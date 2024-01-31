import CardSlider from '../components/CardSlider.vue';

const mockData = {
  abstract_clouds:
    'C:/Users/alfa/Documents/1stJSProjekt/memory/src/data/svg_playing_cards/backs/abstract_clouds.svg'
  // abstract_scene: '/src/data/svg_playing_cards/backs/abstract_scene.svg',
  // astronaut: '/src/data/svg_playing_cards/backs/astronaut.svg',
  // blue: '/src/data/svg_playing_cards/backs/blue.svg',
  // cars: '/src/data/svg_playing_cards/backs/cars.svg',
  // fish: '/src/data/svg_playing_cards/backs/fish.svg',
  // frog: '/src/data/svg_playing_cards/backs/frog.svg',
  // red: '/src/data/svg_playing_cards/backs/red.svg'
};

describe('<CardSlider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(CardSlider, {
      propsData: {
        cards: mockData
      }
    });
  });
});
