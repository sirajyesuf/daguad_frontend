<template>
  <div>
    <app-nav-bar></app-nav-bar>
    <app-hero></app-hero>
    <!-- start package -->
    <app-package></app-package>
    <!-- end package -->
    <!-- start channel catagory -->
    <!-- <app-channelcatagory></app-channelcatagory> -->
    <!-- end channel catagory -->
    <!--start feature -->
    <app-feature></app-feature>
    <!-- endfeature -->
    <!-- start happyclient -->
    <app-happyclient></app-happyclient>
    <!-- end happyclient -->
    <!-- start faq -->
    <app-faq id="faq"></app-faq>
    <!-- end faq -->
    <!-- start have aquestion -->
    <app-haveaquestion></app-haveaquestion>
    <!-- end have aquestion -->
    <!-- star footer> -->
    <app-footer></app-footer>
    <!-- end footer -->
  </div>
</template>

<script>
export default {
  components: {
    'app-nav-bar': require('components/landing/Navbar.vue').default,
    'app-hero': require('components/landing/Hero.vue').default,
    'app-package': require('components/landing/Package.vue').default,
    'app-feature': require('components/landing/Feature.vue').default,
    'app-happyclient': require('components/landing/Happyclient.vue').default,
    'app-faq': require('components/landing/FAQ.vue').default,
    'app-footer': require('components/landing/Footer.vue').default,
    'app-haveaquestion': require('components/landing/Havequestion.vue').default
  }
}
</script>
<style scoped>
@import url('/css/bootstrap.min.css');
@import url('/css/tobii.min.css');
@import url('/css/materialdesignicons.min.css');
@import url('/css/tiny-slider.css');
@import url('/css/style.min.css');
@import url('/css/colors/default.css');
</style>
