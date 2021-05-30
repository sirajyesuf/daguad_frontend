<template>
  <q-btn
    flat
    :no-caps="true"
    label="Return To List"
    color="orange"
    icon="fas fa-list"
    :to="{ name: routename }"
  ></q-btn>
</template>

<script>
export default {
  props: ['routename']
}
</script>
