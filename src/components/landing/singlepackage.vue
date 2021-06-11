<template>
  <div class="col-lg-6 mt-4 pt-2">
    <div class="card event-schedule rounded border">
      <div class="card-body">
        <div class="d-flex">
          <ul class="date text-center text-primary me-3 mb-0 list-unstyled">
            <li class="day fw-bold mb-2">{{ package1.number_of_days }}</li>
            <li class="month fw-bold">Day</li>
          </ul>
          <div class="flex-1 content">
            <h4>
              <a href="javascript:void(0)" class="text-dark title">{{
                package1.name
              }}</a>
            </h4>
            <p class="text-muted location-time">
              <span class="text-dark h6">View Per Day:</span>
              {{ package1.initial_per_day_view }}
              up to
              {{ package1.final_per_day_view }} views<br />
              <span class="text-dark h6">Price:</span>
              {{ package1.total_amount }} ETB
            </p>
            <a
              href="/dashboard/campaign/create_campaign"
              class="btn btn-sm btn-outline-primary"
              >Order Now</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['package1']
}
</script>
