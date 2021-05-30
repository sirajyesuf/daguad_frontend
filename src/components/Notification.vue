<template>
  <q-btn dense round flat icon="notification">
    <q-btn dense color="teal" round icon="notifications" class="q-ml-md">
      <q-badge color="red" floating>{{ notifications.length }}</q-badge>
    </q-btn>

    <q-popup-proxy>
      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6 text-primary text-left">Notifications</div>
          <q-separator></q-separator>
          <div class="text-center text-grey" v-if="!notifications.length">
            No New Notifications!
          </div>
          <div v-else>
            <q-item v-for="(notification, index) in notifications" :key="index">
              <q-item-section>
                <q-item-label caption>
                  {{ notification.data.subject }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>{{
                  new Date(notification.created_at).toLocaleString()
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-card-section>

        <q-card-actions vertical class="q-mt-xl">
          <q-btn
            color="grey"
            round
            flat
            dense
            icon="keyboard_arrow_down"
            :to="{ name: 'notifications' }"
            @click="$emit('markasreadnotifications')"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-popup-proxy>
  </q-btn>
</template>
<script>
export default {
  props: ['notifications'],
  data() {
    return {
      expanded: false
    }
  }
}
</script>
<style scoped>
.my-card {
  width: 350px;
  height: 300px;
}
</style>
