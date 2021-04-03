<template>
  <div class="q-pa-md">
    <q-table
      flat
      title="Campaigns"
      :data="campaigns"
      :columns="columns"
      row-key="name"
      :hide-pagination="true"
      no-data-label="I didn't find anything for you"
      no-results-label="The filter didn't uncover any results"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.message | display_message }}

            <q-popup-proxy
              transition-show="flip-up"
              transition-hide="flip-down"
            >
              <q-card class="fixed-center my-card">
                <img src="props.row.images[0].path" />

                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Harum consequuntur earum architecto amet mollitia expedita eum
                  animi dolore voluptatem illum. Voluptatum ipsa odio omnis vel
                  saepe, cupiditate aliquam enim perferendis!
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat>Action 1</q-btn>
                  <q-btn flat>Action 2</q-btn>
                </q-card-actions>
              </q-card>
            </q-popup-proxy>
          </q-td>
          <q-td key="ps" :props="props">
            <p class="text-primary" v-if="props.row.paid_status">Payed</p>
            <q-btn
              :to="{ name: 'campaign_payment', params: { id: props.row.id } }"
              v-else
              flat
              class="text-primary"
              label="Pay"
            />
          </q-td>
          <q-td key="ap" :props="props">
            {{ props.row.approve_status }}
          </q-td>
          <q-td key="pk" :props="props">
            <q-list>
              <q-item clickable v-ripple>
                <q-item-section>{{
                  props.row.package.final_per_day_view
                }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>{{
                  props.row.package.initial_per_day_view
                }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  {{ props.row.package.number_of_days }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-td>
          <q-td key="action" :props="props">
            <q-btn color="negative" icon-right="delete" no-caps flat dense />
            <q-btn color="positive" icon-right="edit" no-caps flat dense />
            <q-btn
              color="positive"
              icon-right="details"
              no-caps
              flat
              dense
              :to="{ name: 'campaign_history', params: { id: props.row.id } }"
            />
          </q-td>
        </q-tr>
      </template>

      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> Well this is sad... {{ message }} </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      menu: 'filter',
      medium: false,
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'id',
          label: 'Campaign',
          field: 'message',
          align: 'left'
        },
        {
          name: 'ps',
          label: 'PaymentStatus',
          field: 'paid_status',
          align: 'left'
        },
        {
          name: 'ap',
          label: 'ApprovedStatus',
          field: 'approve_status',
          align: 'left'
        },
        {
          name: 'pk',
          label: 'Package',
          field: (row) =>
            `get an estimated view of ${row.initial_per_day_view} up  to ${row.final_per_day_view} per day  for  continious ${row.number_of_day} days `,
          align: 'left',
          format: (val, row) => (val ? '☑' : '☐')
        },
        {
          name: 'action',
          label: 'Action',
          field: 'action',
          align: 'left'
        }
      ],
      selected_data: ''
    }
  },
  methods: {
    EditData(row) {
      alert('hi')
      console.log(row)
      const index = this.data.indexOf(row)
      console.log(index)
      this.selected_data = row
      this.medium = true
    },
    UpdateData() {}
  },
  filters: {
    display_message(value) {
      value = value.toString()
      return value.slice(0, 20) + '.......' + 'seemore'
    }
  },
  computed: {
    // ...mapState('campaign', ['pagination', 'campaigns'])
    ...mapGetters('campaign', ['campaigns'])
  }
}
</script>
<style>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}

.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
// :src="`http://127.0.0.1:8000 // /storage/${campaign.image_path.image_1}`" //
'get siraj an estimated view of' + // '
<br />
' + // row.initial_per_day_view + // ' up to' + // row.final_per_day_view + // '
per day for continious' + // row.number_of_day + // 'days'
