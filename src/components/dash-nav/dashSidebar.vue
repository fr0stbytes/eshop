<template >
  <div class="mt-3">
    <v-list>
        <template v-for="item in items">
          <v-list-tile :key="item.slug" @click.stop="dashboardNavigation (item.slug)" class="mt-2"
          :class="{active : item.slug == selectedRoute}">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    drawer: null,
    selectedRoute: 'home',
    items: [
      { title: 'Home', icon: 'home', slug: 'home' },
      { title: 'Orders', icon: 'shopping_basket', slug: 'orders' },
      { title: 'Customers', icon: 'people', slug: 'customers' },
      { title: 'Products', icon: 'category', slug: 'products' },
      { title: 'Suppliers', icon: 'assignment_ind', slug: 'suppliers' },
      { title: 'Coupons & Codes', icon: 'card_giftcard', slug: 'coupons' },
      { title: 'Recipes', icon: 'room_service', slug: 'recipes' },
      { title: 'Analytics', icon: 'trending_up', slug: 'analytics' }
    ]
  }),
  methods: {
    dashboardNavigation (slug) {
      this.$router.push('/dashboard/' + slug)
      this.selectedRoute = slug
    }
  }
}
</script>

<style lang="css">
.small-logo {
  width: 150px;
  height: auto;
}
.sidebar-icon {
  text-align: center;
  width: 60px;
  display: inline-block;
  position: relative;
  padding-top: 5px;
  background: #dbdbdb;
}
.sidebar-title{
  display: inline-block;
}
.v-divider {
  margin-top: 0;
}
.v-list>div.active {
  border-right: 3px solid #007bff;
  background-color: #f2f2f2;
}
.v-list>div.active i{
  color: #007bff;
}

.v-list>div.active:nth-child(2) i{color: #e83e8c;}
.v-list>div.active:nth-child(3) i{color: #20c997;}
.v-list>div.active:nth-child(4) i{color: #6f42c1;}
.v-list>div.active:nth-child(5) i{color: #007bff;}
.v-list>div.active:nth-child(6) i{color: #e83e8c;}
.v-list>div.active:nth-child(7) i{color: #20c997;}
.v-list>div.active:nth-child(8) i{color: #6f42c1;}

.v-list>div.active:nth-child(2){border-right: 3px solid #e83e8c;}
.v-list>div.active:nth-child(3){border-right: 3px solid #20c997;}
.v-list>div.active:nth-child(4){border-right: 3px solid #6f42c1;}
.v-list>div.active:nth-child(5){border-right: 3px solid #007bff;}
.v-list>div.active:nth-child(6){border-right: 3px solid #e83e8c;}
.v-list>div.active:nth-child(7){border-right: 3px solid #20c997;}
.v-list>div.active:nth-child(8){border-right: 3px solid #6f42c1;}

</style>
