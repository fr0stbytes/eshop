<template>
  <div class="dashboard">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      :mini-variant.sync="mini"
      :clipped="$vuetify.breakpoint.lgAndUp"
    >
      <DashSidebar />
    </v-navigation-drawer>
    <v-toolbar color="white" fixed app flat :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-list-tile @click.stop="mini = !mini" class="toggle-icon pl-0">
        <v-list-tile-action>
          <v-icon>sort</v-icon>

        </v-list-tile-action>
      </v-list-tile>

      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-toolbar>
    <v-content id="main">
      <v-container fluid fill-height>
        <v-layout>
        <router-view />
        </v-layout>
      </v-container>
    </v-content>
    </div>
</template>

<script>
import DashSidebar from '../components/dash-nav/dashSidebar'
import DashNav from '../components/dash-nav/dashNav'
export default {
  data: () => ({
    dialog: false,
    drawer: true,
    mini: true
  }),
  props: {
    source: String
  },
  components: {
    DashSidebar,
    DashNav
  },
  methods: {
    toggleMini () {
      this.mini = !this.mini
    }
  }
}
</script>
<style lang="css">
.v-toolbar__content {
  border-bottom: 1px solid #dbdbdb !important;
}
.toggle-icon a{
  margin-left: 0;
  padding-left: 5px;
}
#main {
  min-height: 100vh;
  background-color: #edf3fc;
  background: linear-gradient(to top,  #feffff 0%,#edf3fc 47%,#edf3fc 100%);
}

</style>
