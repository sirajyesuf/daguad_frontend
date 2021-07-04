<template>
  <q-card class="shadow-15">
    <q-bar class="bg-white" v-if="view === 'mobile'">
      <q-btn flat icon="close" v-close-popup color="grey" class="q-mt-mb">
        <q-tooltip>Close</q-tooltip>
      </q-btn>
    </q-bar>
    <q-card-section class="">
      <div class="text-h6 text-secondary">
        How does this post look in Telegram
      </div>
      <div class="text-weight-thin text-black">
        Below is an example of how a publication will look.
      </div>
      <q-separator color="orange" class="q-mt-xl"></q-separator>
    </q-card-section>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>Example Channel</q-item-label>
      </q-item-section>
    </q-item>
    <q-card-section>
      <div>
        <img :src="photo" class="campaign_image" />
      </div>
      <div class="">
        <p v-html="message" class="message"></p>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props: ['photo', 'message', 'view']
}
</script>
<style scoped>
.campaign_image {
  width: 100%;
}
.message {
  height: 300px;
}
</style>
