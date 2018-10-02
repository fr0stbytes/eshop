<template>
  <div class="mt-5">
    <v-container >
      <v-layout row>
      <v-flex xs12 s12 md12 lg8>
        <v-card dark tile flat color="error" class="ma-2">
          <v-card-text>#1</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 s12 md12 lg4>
        <v-card tile flat color="white" class="ma-2 pa-4">
          <div class="">
            <h4>TOTAL:</h4>
          </div>
          <v-divider light></v-divider>
          <v-layout class="mt-4">
            <v-flex xs6 >
              <div>
                <h5>Sub-total:</h5>
              </div>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <div>
                <h5>11.50  &euro;</h5>
              </div>
            </v-flex>
          </v-layout>
          <v-layout class="mt-2">
            <v-flex xs12>
              <div>
                <h5>Delivery</h5>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-select
                :items="shippings"
                label="Standard"
                item-text="name"
              ></v-select>
            </v-flex>
          </v-layout>
          <div class="mt-2">Some quick example text to build on the card title and make up the bulk of the card's content.</div>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      shippings: 'allShippings'
    })
  }
}
</script>

<style lang="css">
</style>
