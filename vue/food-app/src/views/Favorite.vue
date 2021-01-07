<template>
  <div class="favorite">
    <Navbar/>
  </div>
</template>

<script>
// @ is an alias to /src

import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Favorite',
  components: {
    Navbar
  }
}
</script>
