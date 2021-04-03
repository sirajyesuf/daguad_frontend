<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered class="rounded-borders">
      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox
            :value="category.selected"
            @input="$emit('categoryselected', category.id)"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ category.name }}</q-item-label>
          <q-item-label caption>
            {{ category.description }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
export default {
  props: ['category'],
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
