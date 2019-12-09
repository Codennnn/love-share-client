<template>
  <div>
    <full-calendar :events="events"></full-calendar>
  </div>
</template>

<script>
import fullCalendar from 'vue-fullcalendar'

export default {
  name: 'CheckIn',
  components: {
    fullCalendar,
  },

  data: () => ({
    events: [{
      title: 'Sunny Out of Office',
      start: '2019-12-05',
      end: '2019-12-07',
    }],
  }),
}
</script>

<style lang="scss" scoped>
.comp-full-calendar::v-deep {
  max-width: unset;

  .full-calendar-header {
    margin: 1rem 0rem 2rem;

    .header-center {
      .prev-month,
      .next-month {
        padding: 5px 10px;
        border-radius: 50%;
        color: #fff;
        background-color: rgba(var(--vs-primary), 1);
      }

      .title {
        min-width: 155px !important;
        display: inline-block;
      }
    }
  }

  .full-calendar-body {
    .events-day {
      min-height: 100px !important;
    }

    .event-box {
      .event-item {
        color: #fff !important;
        background: rgba(var(--vs-primary), 1) !important;
      }

      .event-item.is-start {
        margin-left: 6px !important;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        padding-left: 1rem !important;
      }

      .event-item.is-end {
        margin-right: 6px !important;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
      }
    }

    .day-cell {
      &.today {
        background: inherit !important;
        position: relative;

        .day-number {
          position: absolute;
          right: 0;
          margin-right: 3px;
          padding: 2px 0;
          min-height: 26px;
          min-width: 26px;
          text-align: center;
          background: rgba(var(--vs-primary), 1) !important;
          border-radius: 50%;
          color: #fff;
        }
      }
    }

    .not-cur-month.events-day {
      background: #f1f1f1;
      opacity: 0.4;
    }
  }
}
</style>
