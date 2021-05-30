<template>
  <div>
    <!-- Footer Start -->
    <footer class="footer bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
            <a href="#" class="logo-footer">
              <img src="daguad4.png" height="100" alt="" />
            </a>
            <p class="mt-4 text-muted">
              Start working with Landrick that can provide everything you need
              to generate awareness, drive traffic, connect.
            </p>
            <!-- start socila icons -->
            <footer-social-icon></footer-social-icon>
            <!--end social icons-->
          </div>
          <!--end col-->

          <div
            class="col-lg-2 col-md-4 col-sm col-12 mt-4 mt-sm-0 pt-2 pt-sm-0"
          >
            <h5 class="text-dark footer-head">Company</h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <a href="page-aboutus.html" class="text-muted"
                  ><i class="uil uil-angle-right-b me-1"></i> About us</a
                >
              </li>

              <li>
                <a href="page-team.html" class="text-muted"
                  ><i class="uil uil-angle-right-b me-1"></i>FAQ</a
                >
              </li>
            </ul>
          </div>
          <!--end col-->
          <!--end col-->
          <div
            class="col-lg-2 col-md-4 col-sm col-12 mt-4 mt-sm-0 pt-2 pt-sm-0"
          >
            <h5 class="text-dark footer-head">Policy</h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <router-link :to="{ name: 'privacypolicy' }" class="text-muted">
                  <i class="uil uil-angle-right-b me-1"></i>
                  Privacy Policy
                </router-link>
              </li>

              <li>
                <a href="page-terms.html" class="text-muted"
                  ><i class="uil uil-angle-right-b me-1"></i> Terms of
                  Services</a
                >
              </li>
            </ul>
          </div>
          <!--end col-->

          <div
            class="col-lg-3 col-md-4 col-sm col-12 mt-4 mt-sm-0 pt-2 pt-sm-0"
          >
            <h5 class="text-dark footer-head"></h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <a href="documentation.html" class="text-muted">
                  <i class="fas fa-mobile"></i> +251 933 75 3333
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/HahuCloudSupport"
                  target="_blank"
                  class="text-muted"
                >
                  <i class="fas fa-mobile"></i>
                  @HahuCloudSupport</a
                >
              </li>
              <li>
                <a href="components.html" class="text-muted">
                  <i class="fas fa-envelope"></i> hello@hahucloud.com
                </a>
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
    <footer class="footer footer-bar">
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col-sm-6">
            <div class="text-sm-start">
              <p class="mb-0">
                ©
                {{ date }}
                Landrick. Design with
                <i class="mdi mdi-heart text-danger"></i> by
                <a
                  href="http://shreethemes.in/"
                  target="_blank"
                  class="text-reset"
                  >Shreethemes</a
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
</style>
