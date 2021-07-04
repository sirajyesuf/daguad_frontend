<template>
  <!-- Faq Start -->
  <section class="section">
    <div class="container mt-100 mt-60">
      <div class="faq-title text-center pb-3">
        <h3 class="text-primary">Frequently Asked Questions</h3>
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
          que: 'How to Start Earning Money As a Telegram Channel owner.',
          ans:
            'First.you need to add channel.To do this,sign up and fill out an application to add a channel.Your channel will be approved and assigned for catagories with in a day and the channel is ready for advertisement. '
        },
        {
          id: 'Two',
          que: 'What channels do we accept.',
          ans:
            'Your channel must have at least 50,000 subscribers.We also check the validity of subscribers, the absence of bots in the channel,and various methods of cheating.'
        },

        {
          id: 'Five',
          que: 'Do I need to pay for Registering My Telegram Channel.',
          ans:
            "Channel owners don't pay for incoming ads.Right now you can add a channel for free and start making money."
        }
      ]
    }
  },
  components: {
    'single-faq': require('components/landing/singlefaq.vue').default
  }
}
</script>
