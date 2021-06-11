<template>
  <!-- Schedule Start -->
  <section class="section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 text-center">
          <div class="section-title mb-4 pb-2">
            <h4 class="title mb-0 text-primary">
              Select a package that works for your bussiness
            </h4>
            <p class="text-muted para-desc mx-auto mb-0">
              Start working with
              <span class="text-primary fw-bold">dagu Ads</span> that can
              provide everything you need to get more customers for your
              bussiness.
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
              @selectedDay="selectedDay"
            ></displaypackage-tab>
            <!-- endtab -->
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show"
              :class="{ active: day.selected }"
              id="`pills-${day}`"
              role="tabpanel"
              aria-labelledby="`pills-${day}-tab`"
              v-for="(day, index) in days"
              :key="index"
            >
              <div class="row">
                <!-- start single package -->
                <displaypackage-singlepackage
                  v-for="(i, index) in packages[day.value]"
                  :key="index"
                  :package1="i"
                  :day="day"
                ></displaypackage-singlepackage>
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
      days: [],
      packages: {}
    }
  },
  async created() {
    await this.fetchPackages()
    this.selectedDay(this.days[0])
  },
  methods: {
    configdays() {
      this.days = []
      for (const i in this.packages) {
        const day = {
          value: i,
          selected: false
        }
        this.days.push(day)
      }
    },
    async fetchPackages() {
      const response = await this.$api.get('available_packages', {
        params: {
          catagory_id: [1, 2, 3, 4, 5]
        }
      })
      this.packages = response.data
      this.configdays()
    },
    selectedDay(day) {
      this.days.forEach((ele) => {
        if (ele.value === day.value) ele.selected = true
        else ele.selected = false
      })
    }
  },
  components: {
    'displaypackage-tab': require('components/landing/Tab.vue').default,
    'displaypackage-singlepackage': require('components/landing/singlepackage.vue')
      .default
  }
}
</script>
