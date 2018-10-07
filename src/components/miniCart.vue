<template lang="html">
  <div class="minicart-container">
    <b-card title="Title"
          header-tag="header"
          footer-tag="footer">
      <h6 slot="header"
          class="mb-0">Header Slot</h6>
      <em slot="footer">Footer Slot</em>
      <p class="card-text">Header and footers using slots.</p>
      <b-button href="#"
                variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
  
</style>
