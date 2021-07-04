<template>
  <div>
    <!-- Hero Start -->
    <section
      class="bg-half-260 d-table w-100"
      style="background: url('images/digital/home-bg.png') center center"
      id="home"
    >
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6">
            <div class="title-heading mt-4">
              <h6 class="heading mb-0">
                <span class="text-primary mb-0">Effective advertising</span>
                <br />
                <span class="mb-0"> <b class="trusted">in trusted</b></span>
                <br />
                <span class="text-primary mb-0"> Telegram channels</span>
                <span class="text-orange">.</span>
              </h6>
              <p class="para-desc text-muted">
                We help to find the target audience in Telegram and launch
                effective advertising campaigns<br />
                Earn money by registering your active telegram channel.
              </p>
              <div class="row">
                <div class="col mt-4 pt-2" v-if="!isauth">
                  <a
                    href="/account/signin"
                    class="btn btn-pills btn-primary m-1"
                    >Get Started</a
                  >
                  <p class="text-black"></p>
                </div>
                <div class="col mt-4 pt-2" v-if="isauth">
                  <a href="/dashboard" class="btn btn-pills btn-primary m-1"
                    >Go to home</a
                  >
                </div>
              </div>
            </div>
          </div>
          <!--end col-->

          <div class="col-lg-6 col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
            <img src="images/digital/seo.gif" class="img-fluid" alt="" />
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </section>
    <!--end section-->
    <!-- Hero End -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['isauth'])
  }
}
</script>
<style scoped>
.trusted {
  color: white;
  background-color: #fbb040;
  border-radius: 6px;
}
</style>
