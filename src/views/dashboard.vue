<template>
  <div class="dashboard">
    <DashNav content-class="z-2"/>
    <div id="mySidenav" class="sidenav">
      <DashSidebar />
    </div>

    <div id="main">


    </div>
  </div>
</template>

<script>
import DashSidebar from '../components/dash-nav/dashSidebar'
import DashNav from '../components/dash-nav/dashNav'

export default {
  data: () => ({
    dialog: false,
    drawer: true

  }),
  props: {
    source: String
  },
  components: {
    DashSidebar,
    DashNav
  },
  methods: {
    /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
    openNav () {
      document.getElementById('mySidenav').style.width = '250px'
      document.getElementById('main').style.marginLeft = '250px'
    },
    /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
    closeNav () {
      document.getElementById('mySidenav').style.width = '80px'
      document.getElementById('main').style.marginLeft = '80px'
    },
    toggleNav () {
      if (this.drawer === true) {
        this.closeNav()
      } else {
        this.openNav()
      }
      this.drawer = !this.drawer
    }
  }
}
</script>
<style lang="css">
.sidenav {
  height: 100%;
  width: 80px;
  position: fixed;
  z-index: 1;

  left: 0;
  background-color: #fff;
  overflow-x: hidden;
  transition: 0.5s;
}

#main {
  transition: margin-left .5s;
  margin-left: 80px;
  min-height: 100vh;
  background-color: #edf3fc;
  background: linear-gradient(to top,  #feffff 0%,#edf3fc 47%,#edf3fc 100%);
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
}
</style>
