<template>
  <div class="row mt-4 pt-2 position-relative" id="counter" style="z-index: 1">
    <div
      class="col-md-4 col-12 mt-4 pt-2"
      v-for="(i, index) in happyclient"
      :key="index"
    >
      <div class="counter-box text-center">
        <img :src="i.icon" class="avatar avatar-small" alt="" />
        <h2 class="mb-0 mt-4">
          <span class="counter-value" data-target="97">{{ i.val }}</span
          >+
        </h2>
        <h6 class="counter-head text-muted">{{ i.title }}</h6>
      </div>
      <!--end counter box-->
    </div>
  </div>
  <!--end row-->
</template>

<script>
export default {
  data() {
    return {
      happyclient: [
        {
          title: 'Telegram Channel',
          val: 430,
          icon: 'images/illustrator/telegram.svg'
        },
        {
          title: 'Campaign',
          val: 299,
          icon: 'images/illustrator/megaphone.svg'
        },
        {
          title: 'Happy Client',
          val: 300,
          icon: 'images/illustrator/user2.svg'
        }
      ]
    }
  }
}
</script>
