<template>
  <div>
    <!-- Footer Start -->
    <footer class="footer bg">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <a href="/" class="logo-footer">
              <img src="daguad35.png" height="100" alt="" class="logo-bg" />
            </a>
          </div>

          <div class="col-lg-3 mt-5">
            <h5 class="footer-head text-white">Company</h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <router-link to="/aboutus" class="text-muted">
                  <i class="uil uil-angle-right-b me-1"></i> About us
                </router-link>
              </li>

              <li>
                <a href="#faq" class="text-muted"
                  ><i class="uil uil-angle-right-b me-1"></i>FAQ</a
                >
              </li>
            </ul>
          </div>
          <!--end col-->
          <div class="col-lg-3 mt-5">
            <h5 class="footer-head text-white">Policy</h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <router-link :to="{ name: 'privacypolicy' }" class="text-muted">
                  <i class="uil uil-angle-right-b me-1"></i>
                  Privacy Policy
                </router-link>
              </li>

              <li></li>
            </ul>
          </div>
          <!--end col-->

          <div class="col-lg-3 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <h5 class="text-white footer-head">Other Links</h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <a href="#" class="text-muted">
                  <i class="fas fa-mobile"></i> +251 924836179
                </a>
              </li>
              <li>
                <a href="#" class="text-muted">
                  <i class="fas fa-mobile"></i> +251 994920163
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/daguadssupport"
                  target="_blank"
                  class="text-muted"
                >
                  <i class="fab fa-telegram"></i>
                  @daguadssupport</a
                >
              </li>
              <li>
                <a href="#" class="text-muted">
                  <i class="fas fa-envelope"></i> support@daguads.com
                </a>
              </li>
            </ul>
          </div>
          <!--end col-->
          <div class="col-lg-3">
            <footer-social-icon></footer-social-icon>
          </div>
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </footer>
    <!--end footer-->
    <footer class="footer footer-bar">
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col-sm-6">
            <div class="text-sm-start">
              <p class="mb-0">
                ©
                {{ date }}
                Dagu Ads. Design with
                <i class="mdi mdi-heart text-danger"></i> by
                <a
                  href="http://t.me/my_hasen"
                  target="_blank"
                  class="text-reset"
                  >DaguTechnology</a
                >.
              </p>
            </div>
          </div>
          <!--end col-->

          <div class="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <ul class="list-unstyled text-sm-end mb-0">
              <li class="list-inline-item">
                <a href="javascript:void(0)"
                  ><img
                    src="payment_methods.png"
                    class="avatar avatar-ex-sm"
                    alt=""
                /></a>
              </li>
            </ul>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </footer>
    <!--end footer-->
    <!-- Footer End -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear()
    }
  },
  components: {
    'footer-social-icon': require('components/landing/SocialIcons.vue').default
  }
}
</script>
<style scoped>
.hi {
  color: #88adc1;
}
.bg {
  background-color: rgb(2, 33, 68);
}
.logo-bg {
  background-color: white;
}
.title {
  color: #ffffff;
}
</style>
