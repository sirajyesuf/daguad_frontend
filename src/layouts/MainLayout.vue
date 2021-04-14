<template>
  <q-layout view="hhr LpR fff">
    <q-header class="bg-white">
      <q-toolbar>
        <q-btn
          color="primary"
          flat
          dense
          round
          :icon="icon"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-primary"> DaguAd </q-toolbar-title>

        <div>
          <q-btn
            dense
            flat
            round
            icon="notifications"
            class="q-ml-md text-black"
          >
            <q-badge color="red" floating>4</q-badge>
          </q-btn>
          <q-btn-dropdown flat class="q-mx-sm" color="green">
            <q-list>
              <q-item clickable v-ripple v-close-popup>
                <q-item-section avatar>
                  <q-icon name="settings" color="green"></q-icon>
                </q-item-section>
                <q-item-section> Settings </q-item-section>
              </q-item>

              <q-item clickable @click="signout1">
                <q-item-section avatar>
                  <q-icon color="red" name="logout" />
                </q-item-section>
                <q-item-section> SignOut </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
    >
      <q-list>
        <q-item-label header class="text-grey-8"> John Doe </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="xxxxx">
      <q-page class="q-ma-xl">
        <div class="q-pa-md q-gutter-sm bg-white w3-code">
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Channels',
    caption: 'add channel here',
    icon: 'school',
    link: '/dashboard/channels'
  },
  {
    title: 'Campaign',
    caption: 'publishe promotion here',
    icon: 'code',
    link: '/dashboard/campaign'
  },
  {
    title: 'Report',
    caption: 'publishe promotion here',
    icon: 'analytics'
  },
  {
    title: 'Earning',
    caption: 'publishe promotion here',
    icon: 'account_balance_wallet',
    link: '/dashboard/channels/earning'
  },
  {
    title: 'Payment',
    caption: 'publishe promotion here',
    icon: 'account_balance_wallet',
    link: '/dashboard/payment'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    ...mapActions('user', ['signout']),
    signout1() {
      return new Promise((resolve) => {
        this.signout()
          .then((res) => {
            this.$router.push({ path: '/' })
          })
          .catch((err) => {
            console.log('signout err', err)
          })
      })
    }
  },
  computed: {
    ...mapGetters('common', ['loading']),
    icon() {
      if (this.leftDrawerOpen) {
        return 'arrow_forward'
      } else {
        return 'arrow_back'
      }
    }
  }
}
</script>
<style scoped>
.xxxxx {
  background-color: #f1f1f1;
  padding: 0.01em 16px;
  margin: 0px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
}

.w3-code {
  width: auto;
  background-color: #fff;
  padding: 8px 12px;
  border-left: 4px solid #4caf50;
  word-wrap: break-word;
}
</style>
