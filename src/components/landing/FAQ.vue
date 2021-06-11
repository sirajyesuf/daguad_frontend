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
          que: 'How can i  earn money as a telegram channel owner',
          ans:
            'if you have active telegram channel just register  your telegram channel and we post advert on your channel then we pay per post.simple as it is.'
        },
        {
          id: 'Two',
          que: 'How can i launch campaign',
          ans: 'first signup and order your campaign with simple steps'
        },
        {
          id: 'Three',
          que: 'How can i pay for my campaign',
          ans:
            'first signin and from the dashboard click the campaign button  then from the list  select your campaign and click the paycampaign  button then from the list available payment methods select and pay using the given information  finally verify your paymnet using the  transaction number.'
        },
        {
          id: 'four',
          que: 'How can i create account on Dagu Ads',
          ans:
            'to create account first click the SignUp button and then full fill all the required information.finally click the submit button.'
        }
      ]
    }
  },
  components: {
    'single-faq': require('components/landing/singlefaq.vue').default
  }
}
</script>
