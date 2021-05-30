<template>
  <div>
    <!-- Navbar STart -->
    <app-nav-bar></app-nav-bar>
    <!-- Navbar End -->

    <!-- Hero Start -->
    <app-hero></app-hero>
    <!-- Hero End -->

    <!-- How It Work Start -->
    <app-package></app-package>

    <!-- Testi Start -->
    <app-feature></app-feature>
    <!-- Testi End -->
    <app-happyclient></app-happyclient>

    <!-- FAQ n Contact Start -->
    <section class="section bg-light">
      <div class="container">
        <div class="row">
          <app-faq></app-faq>
        </div>
        <!--end row-->

        <div
          class="row my-md-5 pt-md-3 my-4 pt-2 pb-lg-4 justify-content-center"
        >
          <div class="col-12 text-center">
            <div class="section-title">
              <h4 class="title mb-4">Have Question ? Get in touch!</h4>
              <p class="text-muted para-desc mx-auto">
                Start working with
                <span class="text-primary fw-bold">Landrick</span> that can
                provide everything you need to generate awareness, drive
                traffic, connect.
              </p>
              <a href="page-contact-two.html" class="btn btn-primary mt-4"
                ><i class="uil uil-phone"></i> Contact us</a
              >
            </div>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </section>
    <!--end section-->

    <!-- FAQ n Contact End -->

    <!-- Footer Start -->
    <app-footer></app-footer>
    <!-- Footer End -->

    <!-- Back to top -->
    <a
      href="#"
      onclick="topFunction()"
      id="back-to-top"
      class="btn btn-icon btn-primary back-to-top"
      ><i data-feather="arrow-up" class="icons"></i
    ></a>
    <!-- Back to top -->
  </div>
</template>

<script>
export default {
  components: {
    'app-nav-bar': require('components/landing/Navbar.vue').default,
    'app-hero': require('components/landing/Hero.vue').default,
    'app-package': require('components/landing/Package.vue').default,
    'app-happyclient': require('components/landing/Happyclient.vue').default,
    'app-feature': require('components/landing/Feature.vue').default,
    'app-faq': require('components/landing/FAQ.vue').default,
    'app-footer': require('components/landing/Footer.vue').default
  }
}
</script>

<style scoped>
@import url('/css/bootstrap.min.css');
@import url('/css/materialdesignicons.min.css');
@import url('/css/tiny-slider.css');
@import url('/css/style.min.css');
@import url('/css/colors/default.css');
</style>
