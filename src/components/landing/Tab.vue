<template>
  <li class="nav-item">
    <a
      class="nav-link rounded"
      :class="{ active: index === 0 }"
      :id="`pills-${day}-tab`"
      data-bs-toggle="pill"
      :href="`#pills-${day}`"
      role="tab"
      aria-controls="`pills-{$}`"
      aria-selected="false"
    >
      <div class="text-center py-2">
        <h6 class="mb-0">{{ day }}</h6>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  props: ['day', 'index']
}
</script>
