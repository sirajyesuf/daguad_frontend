<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered class="rounded-borders">
      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox
            :value="catagory.selected"
            @input="$emit('catagoryselected', catagory.id)"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ catagory.name }}</q-item-label>
          <q-item-label caption>
            {{ catagory.description }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
export default {
  props: ['catagory'],
  data() {
    return {
      ch: false
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: cadetblue;
}
</style>
