<template>
  <q-input
    ref="email"
    square
    :value="email"
    @input="atinputevent($event)"
    type="email"
    label="Email"
    :rules="[(val) => !!val || 'the email address field is required']"
    :error="error"
    :error-message="error_message"
  >
    <template v-slot:prepend>
      <q-icon name="email" />
    </template>
    <template v-if="email" v-slot:append>
      <q-icon name="cancel" @click.stop="clear" class="cursor-pointer" />
    </template>
  </q-input>
</template>
<script>
export default {
  props: ['email', 'error', 'error_message'],
  methods: {
    atinputevent($event) {
      this.$emit('update:email', $event)
      this.$emit('servererroremail')
    },
    clear() {
      this.$emit('clear')
    }
  }
}
</script>
