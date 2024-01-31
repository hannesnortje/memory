import PlayerDisplay from '../components/PlayerDisplay.vue';

describe('<PlayerDisplay />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(PlayerDisplay);
  });
});
