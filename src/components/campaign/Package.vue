<template>
  <q-card flat>
    <q-tabs
      :value="tab"
      @input="selectedtab"
      dense
      class="text-grey"
      active-color="primary"
      align="justify"
      indicator-color="purple"
    >
      <q-tab
        v-for="day in days"
        :name="day.name"
        :label="`${day.name} days`"
        :key="day.name"
        :disable="day.disablestatus"
      />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel :name="day.name" v-for="day in days" :key="day.name">
        <div class="row q-gutter-xl justify-center">
          <div
            v-for="pack in packages[day.name]"
            :key="pack.id"
            class="col-sm-6 col-md-3"
          >
            <q-card
              square
              @click="selectedpackage(day.name, pack.id)"
              :class="{ selected: pack.selected }"
            >
              <q-card-section class="text-black">
                <div class="text-h6">ETB {{ pack.total_amount }}</div>
                <div class="text-subtitle2">
                  {{
                    `get an estimated view of ${pack.initial_per_day_view} upto
                  ${pack.final_per_day_view} `
                  }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
export default {
  props: ['days', 'packages', 'selected_package'],
  data() {
    return {
      tab: null,
      disabletab: false
    }
  },
  created() {
    if (this.selected_package) this.tab = this.selected_package.dayname
    else this.tab = this.days[0].name
  },
  methods: {
    selectedtab(name) {
      this.tab = name
    },
    selectedpackage(day, packageId) {
      this.$emit('selectedpackage', day, packageId)
    }
  }
}
</script>
<style scoped>
.selected {
  background-color: cyan;
}

.my-card {
  width: 100%;
  max-width: 200px;
}
</style>
