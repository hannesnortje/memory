import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getAllCards, getAllBacks } from "@/composables/api/getApi.js"
import { shuffleArray} from "@/composables/tools.js"

export const useCardStore = defineStore('cardStore', {
  state: () => ({
    deck: [],
    backs: [],
  }),

  actions: {
    async fetchDeck() {
      try {
        const response = await getAllCards('../../src/data/packCards.json');
        this.deck = response;
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    },

    getDeck(){
      return this.deck;
    },

    getSupDeckIndexs(num:number, min=1, max=54) {
      const initialNumbers = new Set();
      while(initialNumbers.size < (num / 2)) {
        const number = ~~(Math.random() * (max - min + 1) + min);
        initialNumbers.add(number);
      }
      let numbers = Array.from(initialNumbers);
      numbers = [...numbers, ...numbers];
      return shuffleArray(numbers);
    },

    async fetchBacks() {
      try {
        const response = await getAllBacks('../../src/data/packCards.json');
        this.backs = response;
      } catch (error) {
        console.error('Error fetching backs:', error);
      }
    },

    getBacks(){
      return this.backs;
    }
  },
});