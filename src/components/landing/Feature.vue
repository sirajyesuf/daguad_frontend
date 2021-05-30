<template>
  <div>
    <section class="section border-bottom">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="section-title text-center mb-4 pb-2">
              <h4 class="title mb-4">Our Features</h4>
              <p class="text-muted para-desc mb-0 mx-auto">
                Start working with
                <span class="text-primary fw-bold">Landrick</span> that can
                provide everything you need to generate awareness, drive
                traffic, connect.
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
                <p class="text-muted mb-0">T{{ i.description }}</p>
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
          title: 'target user',
          icon: 'fas fa-users',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam impedit obcaecati, molestiae dolores consectetur ipsam ab similique aspernatur natus. Error dolores consequatur dignissimos mollitia labore ipsam, officiis deleniti facere modi'
        },
        {
          title: 'flexibility',
          icon: 'fas fa-money-bill-alt',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam impedit obcaecati, molestiae dolores consectetur ipsam ab similique aspernatur natus. Error dolores consequatur dignissimos mollitia labore ipsam, officiis deleniti facere modi'
        },
        {
          title: 'easy to use',
          icon: 'far fa-life-ring',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam impedit obcaecati, molestiae dolores consectetur ipsam ab similique aspernatur natus. Error dolores consequatur dignissimos mollitia labore ipsam, officiis deleniti facere modi'
        },
        {
          title: 'report',
          icon: 'fas fa-users',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam impedit obcaecati, molestiae dolores consectetur ipsam ab similique aspernatur natus. Error dolores consequatur dignissimos mollitia labore ipsam, officiis deleniti facere modi'
        }
      ]
    }
  }
}
</script>
