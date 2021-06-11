<template>
  <div>
    <section class="section border-bottom">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="section-title text-center mb-4 pb-2">
              <h4 class="title mb-4 text-primary">Our Features</h4>
              <p class="text-muted para-desc mb-0 mx-auto">
                Start working with
                <span class="text-primary fw-bold">dagu Ads</span> that can
                provide everything you need to get more customers for your
                bussiness, earn money using your active telegram channel.
              </p>
            </div>
          </div>
          <!--end col-->
        </div>
        <!--end row-->

        <div class="row">
          <div
            class="col-lg-4 col-md-6 mt-5"
            v-for="(i, index) in features"
            :key="index"
          >
            <div class="d-flex features feature-clean">
              <div class="text-primary text-center mx-auto">
                <i :class="i.icon" style="font-size: 50px"></i>
              </div>
              <div class="flex-1 content ms-4">
                <h5 class="mb-1">
                  <a href="javascript:void(0)" class="text-dark">{{
                    i.title
                  }}</a>
                </h5>
                <p class="text-muted mb-0">{{ i.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <!--end row-->
        <!--end row-->
      </div>
      <!--end container-->
    </section>

    <!-- End -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          title: 'Active Telegram Channel',
          icon: 'fab fa-telegram-plane',
          description:
            'we have active telegram channels, that have many subscribers and many posts so,the probability of the campaign to reach the user is high'
        },
        {
          title: 'Campaign Report',
          icon: 'fas fa-ad',
          description:
            'we provide full report for your campaign how much view the campaign get daily, monthly and with day intervals.'
        },
        {
          title: 'Target User.',
          icon: 'fas fa-users',
          description:
            'we have many channels that belongs to different categories like technology,sport,health,arts and many others so you can order your advert based on your needs,as a result you will get your targeted user.'
        },
        {
          title: 'Reasonable,Flexible Price.High Service.',
          icon: 'fas fa-money-bill-alt',
          description:
            'we provide flexible pricing packages, based on your pricing abilities you can order from minimum price to high price packages.'
        },
        {
          title: 'Great Support.',
          icon: 'far fa-life-ring',
          description:
            'We are here anytime you need help 24/7/365 to assist you with any aspect of your experience with our service.'
        },
        {
          title: 'Easy to use.',
          icon: 'fas fa-smile',
          description:
            'using our web app is easy both for telegram channel owners and bussiness owners for ordering a campaign and registration of telegram channel respectively is simple and fast.'
        }
      ]
    }
  }
}
</script>
