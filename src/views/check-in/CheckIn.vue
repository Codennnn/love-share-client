<template>
  <div>
    <full-calendar
      :events="events"
      @eventClick="onCheckIn"
      @dayClick="onCheckIn"
    >
      <div slot="fc-header-right">
        <span>已连续签到</span>
        <span class="mx-2 text-primary text-lg font-bold">{{ events.length }}</span>
        <span>天</span>
      </div>
    </full-calendar>
  </div>
</template>

<script>
import fullCalendar from 'vue-fullcalendar'

import { getCheckIn, checkIn } from '@/request/api/user'

export default {
  name: 'CheckIn',
  components: { fullCalendar },

  data: () => ({
    events: [],
  }),

  created() {
    this.getCheckIn()
  },

  methods: {
    async getCheckIn() {
      const { code, data } = await getCheckIn()
      if (code === 2000) {
        this.events = data.check_in_list
      }
    },

    async onCheckIn(day) {
      const today = this.$dayjs(day).format('YYYY-MM-DD')
      if (this.$dayjs().isSame(today, 'day')) {
        if (this.events.every(el => el.start !== today)) {
          const event = {
            title: '已签到',
            start: today,
            end: today,
          }
          const { code } = await checkIn({ check_in: event })
          if (code === 2000) {
            this.events.push(event)
          }
        }
      }
    },
  },
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
      margin-top: 15px;
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
