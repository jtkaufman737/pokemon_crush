<template>
  <div class="Home">
    <Modal v-show="isModalVisible" @close="closeModal"></Modal>
    <center>
      <h1> Pokemon Crush</h1>
     <div id="board" class="board">
       <!-- rows and columns -->
    </div>
  </center>
  </div>
</template>

<script>
import Modal from './Modal'
export default {
  name: 'Home',

  components: { Modal },

  data() {
    return {
      isModalVisible: false,
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
      board: [[],[],[],[],[],[],[],[],[]],
      pair:[],
      matched: [],
    }
  },

  methods: {
    closeModal: function() {
      this.isModalVisible = false;
      document.getElementsByClassName("modal")[0].classList.remove('is-active')
    },

    openModal: async function(msg, title) {
      this.isModalVisible = true;
      await this.$store.dispatch('ACT_ALERTS', { alerts: msg, alertTitle: title})
      document.getElementsByClassName("modal")[0].classList.add('is-active')
    },

    pickCards: function() {                  // picks the sets of icons people will be matching
      while(this.deck.length < 8) {
        let curr = this.pokemon[Math.floor(Math.random() * this.pokemon.length)]
        this.deck.indexOf(curr) === -1 ? this.deck.push(curr) : '' // ensures 8 unique images
      }
      this.buildBoard();
    },

    buildBoard: function() {
      let self = this;
      /* Done programmatically instead of a v-for to give me ids to grab to figure out what's being switched */
      for(var i=0; i < this.board.length; i++) { // into outer array
        let board = document.getElementById("board")
        let row = document.createElement("div")
        row.classList.add("row")
        row.id = i;
        board.appendChild(row)

        for(var j=0; j < 9; j++) {    // inner array
          let tile = document.createElement("div");
          let img = document.createElement("img")
          img.src = this.deck[Math.floor(Math.random() * this.deck.length)]
          tile.classList.add("tile");
          tile.addEventListener("click", function() { self.moveTiles(tile) })
          tile.id = `${i}-${j}`;
          this.board[i].push(tile.id);
          tile.appendChild(img);
          row.appendChild(tile);
        }
      }

      this.checkMatches();
    },

    switchTileAttrs: function(pair) {
      let valid = false;
      // commence ugly code. Its my side project I'll write ugly ternaries if I want to lol
      parseInt(pair[0].id.split("-")[0]) + 1 == pair[1].id.split("-")[0] || pair[0].id.split("-")[0] - 1 == pair[1].id.split("-")[0] ? valid = true : '';
      parseInt(pair[0].id.split("-")[1]) + 1 == pair[1].id.split("-")[1] || pair[0].id.split("-")[1] - 1 == pair[1].id.split("-")[1] ? valid = true : '';

      if(valid) {
        let aSrc = document.getElementById(this.pair[0].id).firstChild.src;
        let bSrc = document.getElementById(this.pair[1].id).firstChild.src;
        document.getElementById(this.pair[0].id).firstChild.src = bSrc;
        document.getElementById(this.pair[1].id).firstChild.src = aSrc;
        // switches images
        let bId = document.getElementById(this.pair[0].id).id;
        let aId = document.getElementById(this.pair[1].id).id;
        document.getElementById(aId).id = bId;
        document.getElementById(bId).id = aId;
      } else {
        // this.openModal("To make a match, please select adjacent tiles","Error");
      }
    },

    moveTiles: async function(tile) {

      if(this.pair.length < 2) {  // ensures we have two values before wasting time checking anything
        this.pair.push(tile)
      }

      if(this.pair.length === 2) {
        await this.switchTileAttrs(this.pair); // switches attributes first
        this.checkMatches();
      }
    },

    checkMatches: function() {
      for(let i=0; i < this.board.length; i++) {              // goes over boards
        for(let j=0; j < this.board[i].length; j++) {         // goes over tiles
          this.matched.push(`${i}-${j}`); // starting point
          let z=1;
          console.log(`${i}-${j}`);

          while(document.getElementById(`${i}-${j + z}`) && document.getElementById(`${i}-${j}`).firstChild.src === document.getElementById(`${i}-${j + z}`).firstChild.src) {
            console.log(z + " matches on " + document.getElementById(`${i}-${j}`).firstChild.src + " image.");
            z++;
          }
        }
      }
    },
  },

  computed: {
    //...mapState([])
    currBoard: function() {
      return this.board
    },
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
  /* display:flex; */
  justify-content:space-around;
}

.board {
  width:90%;
  display:block;
  /* justify-content:space-between; */
}

div#board {
  display:block;
}

div.row {
  display:flex;
  justify-content:space-around;
  width:750px;
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

.tile:hover {
  border:1px solid #9aa5b7;
}

h1 {
  font-family:'Pacifico', cursive;
  color:#8942f4;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
