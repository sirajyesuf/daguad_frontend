<template>
  <div class="row my-md-5 pt-md-3 my-4 pt-2 pb-lg-4 justify-content-center">
    <div class="col-12 text-center">
      <div class="section-title">
        <h4 class="title mb-4">Have Question ? Get in touch!</h4>
        <p class="text-muted para-desc mx-auto">
          click the button and send us your comment
        </p>

        <router-link :to="{ name: 'contactus' }" class="btn btn-primary mt-4">
          <i class="uil uil-phone"></i> Contact us
        </router-link>
      </div>
    </div>
  </div>
</template>
