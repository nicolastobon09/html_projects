<template>
  <div class="app">
    <nav>
      <div class="navbar-container">
        <div class="navbar-content">
          <div class="navbar-content--icon">
            <router-link to="/">
              <i class='bx bx-home-smile' ></i>
            </router-link>
          </div>
          <div class="navbar-content--icon">
            <router-link to="/shop">
              <i class='bx bx-shopping-bag' ></i>
            </router-link>
          </div>
          <div class="navbar-content--icon">
            <router-link to="/favorite">
              <i class='bx bx-heart' ></i>
            </router-link>
          </div>
          <div class="navbar-content--icon">
            <router-link to="/history">
              <i class='bx bx-revision' ></i>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
nav {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
.navbar-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background-color: #FFFF;
}
.navbar-container .navbar-content {
  padding: 15px;
  display: flex;
  justify-content: space-around;
}
.navbar-content .navbar-content--icon {
  width: 24px;
  height: 24px;
}
.navbar-content--icon a {
  font-size: 2.7rem;
  color: #9b9b9b;
  &.router-link-exact-active {
    color: rgb(255, 131, 62);
  }
}
</style>
