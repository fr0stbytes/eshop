<template >
  <div class="dashboard-navbar pl-3 pr-3 border-bottom">
    <b-navbar type="light">
      <b-link @click="$parent.toggleNav()">
        <i class="material-icons">sort</i>
        <span class="sr-only">User</span>
      </b-link>
      <b-link class="navbar-brand" :to="'/dashboard'">Dashboard</b-link>
    </b-navbar>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.dashboard-navbar {

}
</style>
