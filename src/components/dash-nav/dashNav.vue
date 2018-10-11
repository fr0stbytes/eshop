<template >
  <div class="dashboard-navbar border-bottom">
    <b-navbar type="light" class="m-0 p-0">
      <b-link @click="$parent.toggleNav()" class="dashnav-toggle border-right">
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
.dashnav-toggle {
  width: 80px;
  padding: 1em 0;
  text-align: center;
}
</style>
