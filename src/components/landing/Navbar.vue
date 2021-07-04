<template>
  <!-- Navbar STart -->
  <header id="topnav" class="defaultscroll sticky">
    <div class="container">
      <!-- Logo container-->
      <a class="logo" href="/">
        <img src="daguad22.png" height="60" class="logo-light-mode" alt="" />
      </a>
      <div class="buy-button" v-if="!isauth">
        <a href="/account/signup" class="btn btn-primary">Sign Up</a>
      </div>
      <div class="buy-button" v-if="!isauth">
        <a href="account/signin" class="btn btn-primary">Sign In</a>
      </div>
      <!--end login button-->
      <!-- End Logo container-->
      <div class="menu-extras" v-if="!isauth">
        <div class="menu-item">
          <!-- Mobile menu toggle-->
          <a
            class="navbar-toggle"
            id="isToggle"
            onclick="toggleMenu()"
            v-if="$q.screen.lt.lg"
          >
            <div class="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
          <!-- End mobile menu toggle-->
        </div>
      </div>

      <div id="navigation">
        <!-- Navigation Menu-->
        <!--end navigation menu-->
        <div class="row">
          <div class="buy-menu-btn d-none col">
            <a href="account/signup" class="btn btn-primary">Sign Up</a>
          </div>
          <div class="buy-menu-btn d-none col">
            <a href="account/signin" class="btn btn-primary">Sign In</a>
          </div>
        </div>

        <!--end login button-->
      </div>
      <!--end navigation-->
    </div>
    <!--end container-->
  </header>
  <!--end header-->
  <!-- Navbar End -->
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['isauth'])
  }
}
</script>
