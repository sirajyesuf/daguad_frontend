<template>
  <div class="row q-gutter-md">
    <div class="col-3">
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section class="text-weight-bold"
            >Account Settings</q-item-section
          >
        </q-item>

        <q-item clickable v-ripple @click="settings('notification')">
          <q-item-section class="text-weight-thin">
            <q-item-label>Notification</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="settings('changepassword')">
          <q-item-section class="text-weight-thin">
            <q-item-label>Change Password</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section class="text-weight-thin">
            <q-item-label>Delete Account</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-8">
      <div v-if="notification" class="q-mt-xl">
        <q-toggle
          label="send to me notification via telegram bot"
          v-model="toggle"
        />
        <p class="text-purple text-center">
          <a href="#" target="_blank" rel="noopener noreferrer" v-if="toggle">
            please click here
          </a>
        </p>
      </div>
      <div v-if="changepassword" class="q-mt-xl">
        <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
          <password-input lable="old password"></password-input>
          <password-input lable="new password"></password-input>

          <div>
            <q-btn flat label="Submit" type="submit" color="primary" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      notification: false,
      changepassword: false,
      toggle: false
    }
  },
  methods: {
    settings(wht) {
      if (wht === 'notification') {
        this.notification = true
        this.changepassword = false
      }
      if (wht === 'changepassword') {
        this.notification = false
        this.changepassword = true
      }
    }
  },
  components: {
    'password-input': require('components/account/common/PasswordInputField.vue')
      .default
  }
}
</script>

PasswordInputField
