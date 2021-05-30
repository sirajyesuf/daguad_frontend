<template>
  <!-- Faq Start -->
  <section class="section">
    <div class="container mt-100 mt-60">
      <div class="faq-title text-center pb-3">
        <h3>Frequently Asked Questions</h3>
      </div>
      <div class="row align-items-center">
        <div class="col">
          <div class="accordion" id="accordionExample">
            <!-- start single faq -->
            <single-faq
              v-for="(faq, index) in faqs"
              :key="index"
              :faq="faq"
            ></single-faq>
            <!-- end single faq -->
          </div>
        </div>
        <!--end col-->

        <!-- <div
          class="col-lg-5 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0"
          v-if="$q.screen.gt.sm"
        >
          <img src="images/illustrator/faq.svg" alt="" />
        </div> -->
        <!--end col-->
      </div>
      <!--end row-->
    </div>
    <!--end container-->
  </section>
  <!--end section-->
  <!-- Faq End -->
</template>

<script>
export default {
  data() {
    return {
      faqs: [
        {
          id: 'One',
          que: 'the question here',
          ans: 'the answer here'
        },
        {
          id: 'Two',
          que: 'the question here',
          ans: 'the answer here'
        },
        {
          id: 'Three',
          que: 'the question here',
          ans: 'the answer here'
        },
        {
          id: 'Four',
          que: 'the question here',
          ans: 'the answer here'
        }
      ]
    }
  },
  components: {
    'single-faq': require('components/landing/singlefaq.vue').default
  }
}
</script>
