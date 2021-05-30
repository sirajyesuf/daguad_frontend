<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-spinner v-if="loading" color="grey" size="3em" :thickness="10" />

    <q-card class="col-md row-sm my-card">
      <q-card-section class="bg-orange text-white text-center">
        <div class="text-subtitle1">Number of Channel</div>
        <div class="text-subtitle2">10</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn
          flat
          color="primary"
          :no-caps="true"
          label="Channel List"
          to="/dashboard/channels"
        ></q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="col-md row-sm my-card">
      <q-card-section class="bg-orange text-white text-center">
        <div class="text-subtitle1">Number of Campaign</div>
        <div class="text-subtitle2">100</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn
          flat
          color="primary"
          :no-caps="true"
          label="Campaign List"
          to="/dashboard/campaign"
        ></q-btn>
      </q-card-actions>
    </q-card>
    <q-card class="col-md row-sm my-card">
      <q-card-section class="bg-orange text-white text-center">
        <div class="text-subtitle1">Total Earning</div>
        <div class="text-subtitle2">1000 ETB</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn
          flat
          color="primary"
          :no-caps="true"
          label="View Earning"
          to="dashboard/channels/earning"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style lang="css" scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>
