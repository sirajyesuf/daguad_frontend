<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white">
      <q-toolbar>
        <q-btn
          color="primary"
          dense
          flat
          round
          icon="menu"
          @click="left = !left"
        />

        <q-toolbar-title>
          <a href="/" style="text-decoration: none" class="text-primary">
            Dagu Ads
          </a>
        </q-toolbar-title>

        <div>
          <span>
            <Notifications
              :notifications="unreadnotifications"
              @markasreadnotifications="Markasreadnotifications"
            ></Notifications>
          </span>
          <q-btn-dropdown flat class="q-mx-sm" color="green">
            <q-list>
              <q-item :to="{ name: 'settings' }">
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
      show-if-above
      v-model="left"
      side="left"
      bordered
      content-class="bg-white"
    >
      <q-list>
        <q-item-label header class="text-black">
          {{ userinfo.name }} ({{ userinfo.email }})
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container :class="{ xxxxx: $q.screen.gt.sm ? true : false }">
      <q-page :class="{ 'q-ma-xl': $q.screen.gt.sm ? true : false }">
        <div
          class="q-pa-md q-gutter-sm bg-white"
          :class="{ code: $q.screen.gt.sm ? true : false }"
        >
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import EssentialLink from 'components/EssentialLink.vue'
import Notifications from 'components/Notification.vue'

const linksData = [
  {
    title: 'Dashboard',
    icon: 'fas fa-bullhorn',
    link: '/dashboard'
  },
  {
    title: 'Channels',
    icon: 'fas fa-bullhorn',
    link: '/dashboard/channels'
  },
  {
    title: 'Campaigns',
    icon: 'fas fa-ad',
    link: '/dashboard/campaign'
  },

  {
    title: 'Earning',
    icon: 'account_balance_wallet',
    link: '/dashboard/channels/earning'
  },
  {
    title: 'Payment',
    icon: 'account_balance_wallet',
    link: '/dashboard/payment'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink, Notifications },
  data() {
    return {
      left: false,

      leftDrawerOpen: false,
      essentialLinks: linksData,
      unreadnotifications: []
    }
  },
  async created() {
    await this.Fetchunreadnotifications()
  },
  methods: {
    ...mapActions('user', ['signout']),
    ...mapActions('notification', ['markasreadnotifications']),
    async Fetchunreadnotifications() {
      setInterval(async () => {
        if (this.isauth) {
          const response = await this.$api.get(
            'notifications/unread_notifications'
          )
          console.log(response)
          this.unreadnotifications = response.data
        }
      }, 10000)
    },
    async Markasreadnotifications() {
      await this.$api.get('notifications/read_notification')
      await this.Fetchunreadnotifications()
    },
    async signout1() {
      await this.signout()
      this.$router.push({ path: '/' })
    }
  },
  computed: {
    ...mapGetters('user', ['isauth', 'userinfo']),
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

.code {
  width: auto;
  background-color: #fff;
  padding: 8px 12px;
  border-left: 4px solid #4caf50;
  word-wrap: break-word;
}
.my-card {
  width: 100%;
  width: 350px;
  height: 200px;
}
</style>
