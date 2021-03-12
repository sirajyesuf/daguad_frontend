<template>
  <q-input
    ref="password"
    square
    clearable
    :value="password"
    @input="$emit('update:password', $event)"
    type="password"
    :label="lable"
    :rules="[(val) => !!val || 'the password  field is required']"
  >
    <template v-slot:prepend>
      <q-icon name="lock" />
    </template>
  </q-input>
</template>
<script>
export default {
  props: ['password', 'lable']
}
</script>

// :error="password" // :error-message="password"
