<template>
    <div class="modal">
      <div class="modal-background"></div>
      <div class="level">
          <span>{{ alertTitle }}</span>
          <img @click="close()" class="modalIcon" src="https://i.imgur.com/toHQH5Q.png"/>
        </div>
        <div>
          <span>
            <h6>{{ alert }}</h6>
        </span>
        </div>
        <div class="level">
          <button class="button jadeButton" @click="close()">CLOSE</button>
        </div>
      </div>
   </div>
</template>
<script>
import store from '@/store'
import { Vuex, mapState } from 'vuex'

export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close')
      this.$parent.closeModal();
    },
  },

  computed: {
    ...mapState(['alert', 'alertTitle']),
  },

  mounted() {
    console.log("Instance of MODAL running")
  }
};
</script>
