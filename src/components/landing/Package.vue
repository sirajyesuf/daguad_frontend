<template>
  <!-- Schedule Start -->
  <section class="section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 text-center">
          <div class="section-title mb-4 pb-2">
            <h4 class="title mb-4">Event Schedules</h4>
            <p class="text-muted para-desc mx-auto mb-0">
              Start working with
              <span class="text-primary fw-bold">Landrick</span> that can
              provide everything you need to generate awareness, drive traffic,
              connect.
            </p>
          </div>
        </div>
        <!--end col-->
      </div>
      <!--end row-->

      <div class="row mt-4 pt-2 justify-content-center">
        <div class="col-lg-8 col-md-12 text-center">
          <ul
            class="nav nav-pills rounded nav-justified flex-column flex-sm-row"
            id="pills-tab"
            role="tablist"
          >
            <!-- start tab -->
            <displaypackage-tab
              :day="day"
              v-for="(day, index) in days"
              :key="index"
              :index="index"
            ></displaypackage-tab>
            <!-- endtab -->
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-dayone"
              role="tabpanel"
              aria-labelledby="pills-dayone-tab"
            >
              <div class="row">
                <!-- start single package -->
                <displaypackage-singlepackage
                  v-for="(i, index) in 2"
                  :key="index"
                ></displaypackage-singlepackage>
                <!-- end singlepankage -->
              </div>
            </div>
            <!--end teb pane-->
            <div
              class="tab-pane fade show active"
              id="pills-dayfour"
              role="tabpanel"
              aria-labelledby="pills-daytwo-tab"
            >
              <div class="row">
                <!-- start single package -->
                <displaypackage-singlepackage></displaypackage-singlepackage>
                <!-- end singlepankage -->
              </div>
            </div>
            <!--end teb pane-->
            <div
              class="tab-pane fade"
              id="pills-daytwo"
              role="tabpanel"
              aria-labelledby="pills-daythree-tab"
            >
              <div class="row">
                <!-- start single package -->
                <displaypackage-singlepackage></displaypackage-singlepackage>
                <!-- end singlepankage -->
              </div>
            </div>
            <!--end teb pane-->

            <div
              class="tab-pane fade"
              id="pills-daythree"
              role="tabpanel"
              aria-labelledby="pills-dayfour-tab"
            >
              <div class="row">
                <!-- start single package -->
                <displaypackage-singlepackage></displaypackage-singlepackage>
                <!-- end singlepankage -->
              </div>
            </div>
            <!--end teb pane-->
          </div>
          <!--end tab content-->
        </div>
        <!--end col-->
      </div>
      <!--end row-->
    </div>
    <!--end container-->
  </section>
  <!--end section-->
  <!-- Schedule End -->
</template>
<script>
export default {
  data() {
    return {
      days: ['dayone', 'daytwo', 'daythree', 'dayfour'],
      packages: {
        dayone: [
          {
            name: 'silver package',
            see: '200 up 400 view per day'
          }
        ],
        daytwo: [
          {
            name: 'golden package',
            see: '200 up 400 view per day'
          }
        ],
        daythree: [
          {
            name: 'premimum package',
            see: '200 up 400 view per day'
          }
        ],
        dayfour: [
          {
            name: 'bronze package',
            see: '200 up 400 view per day'
          }
        ]
      }
    }
  },
  components: {
    'displaypackage-tab': require('components/landing/Tab.vue').default,
    'displaypackage-singlepackage': require('components/landing/singlepackage.vue')
      .default
  }
}
</script>
