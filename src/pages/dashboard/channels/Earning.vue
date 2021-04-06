<template>
  <div class="column">
    <div class="col">
      {{ date }}
      <!-- <q-input outlined v-model="date" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="date" range minimal>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input> -->
      <!-- <q-date v-model="date" range minimal /> -->

      <div class="q-pa-md">
        <div class="q-gutter-md">
          <q-date v-model="date" />

          <q-date v-model="date" />
        </div>
      </div>
    </div>
    <div class="col">
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-right">Channel</th>
            <th class="text-right">Number of Posts</th>
            <th class="text-right">Earning</th>
          </tr>
        </thead>
        <tbody>
          <template>
            <tr>
              <td class="text-left">1</td>
              <td class="text-right">tikvah</td>
              <td class="text-right">3</td>
              <td class="text-right">299 birr</td>
            </tr>
          </template>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: { from: '2020/07/08', to: '2020/07/17' }
    }
  }
}
</script>
