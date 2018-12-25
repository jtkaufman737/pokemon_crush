<template>
  <div class="Home">
    <div class="row" v-for="row in board">
       <!-- {{ row }} foo -->
      <div class="tile" v-for="pokemon in row">
        <img :src="pokemon" :class="pokemon"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      pokemon: [
        'https://i.imgur.com/Hz1WUjU.png',
        'https://i.imgur.com/GUxLD1W.png',
        'https://i.imgur.com/LMLBWxY.png',
        'https://i.imgur.com/XzWv6EA.png',
        'https://i.imgur.com/twAyuun.png',
        'https://i.imgur.com/5d9H9II.png',
        'https://i.imgur.com/na0oH0E.png',
        'https://i.imgur.com/h9yu4U1.png',
        'https://i.imgur.com/LaMdVvg.png',
        'https://i.imgur.com/kX34X0t.png',
        'https://i.imgur.com/s49F1dL.png',
        'https://i.imgur.com/N2KJGdL.png',
        'https://i.imgur.com/Icrf6qv.png',
        'https://i.imgur.com/NgVrvUo.png',
        'https://i.imgur.com/CvoBW9m.png',
        'https://i.imgur.com/DSn9vQh.png',
        'https://i.imgur.com/rHKyzuF.png',
        'https://i.imgur.com/TjvldPR.png',
        'https://i.imgur.com/A8TRB4R.png',
        'https://i.imgur.com/EMZMi5C.png',
        'https://i.imgur.com/D8sXRcs.png',
        'https://i.imgur.com/gmfT5zb.png'
      ],
      deck: [],
      board: [[],[],[],[],[],[],[],[],[],[]],
    }
  },

  methods: {
    pickCards: function() {
      while(this.deck.length < 8) {
        let curr = this.pokemon[Math.floor(Math.random() * this.pokemon.length)]
        this.deck.indexOf(curr) === -1 ? this.deck.push(curr) : ''
      }
      this.buildBoard();
    },

    buildBoard: function() {
      for(var i=0; i < this.board.length; i++) { // into outer array
        for(var j=0; j < 9; j++) {    // populate inner array
          this.board[i][j] = this.deck[Math.floor(Math.random() * this.deck.length)]
        }
      }
    },

    checkMatches: function() {
      // measure the stuff around the
    }
  },

  computed: {
    currBoard: function() {
      return this.board
    }
  },

  mounted () {
    this.pickCards();
  }
}
</script>
<style>

img {
  height:50px;
}

#app {
  display:flex;
  justify-content:space-around;
}

.board {
  width:90%;
  display:block;
  justify-content:space-between;
}

.row {
  display:inline-flex;
  /* background-color:green; */
}

.tile {
  margin:3px;
  padding:10px;
  border:1px solid #e6e8ed;
  border-radius:5px;
  height:50px;
  width:55px;
  display:flex;
  /* background-color:red; */
  justify-content:space-around;
  vertical-align:center;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
