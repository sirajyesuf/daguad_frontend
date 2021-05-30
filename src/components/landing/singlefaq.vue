<template>
  <div class="accordion-item rounded shadow">
    <h2 class="accordion-header" :id="`heading${faq.id}`">
      <button
        class="accordion-button border-0 bg-light"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapse${faq.id}`"
        :aria-expanded="faq.id === 'One' ? true : false"
        :aria-controls="`collapse${faq.id}`"
      >
        {{ faq.que }} ?
      </button>
    </h2>
    <div
      :id="`collapse${faq.id}`"
      class="accordion-collapse border-0 collapse"
      :aria-labelledby="`heading${faq.id}`"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body text-muted bg-white">
        {{ faq.ans }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['faq']
}
</script>
