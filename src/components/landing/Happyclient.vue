<template>
  <div class="row mt-4 pt-2 position-relative" id="counter" style="z-index: 1">
    <div class="col-md-3 col-6 mt-4 pt-2" v-for="(i, index) in 4" :key="index">
      <div class="counter-box text-center">
        <img
          src="images/illustrator/Asset190.svg"
          class="avatar avatar-small"
          alt=""
        />
        <h2 class="mb-0 mt-4">
          <span class="counter-value" data-target="97">300</span>+
        </h2>
        <h6 class="counter-head text-muted">Happy Client</h6>
      </div>
      <!--end counter box-->
    </div>
  </div>
  <!--end row-->
</template>
