// import something here

import moment from 'moment'

const Imagefullurl = {
  filters: {
    imagefullurl(value) {
      if (value.indexOf('base64') !== -1) return value
      return `https://api.daguads.com/storage/${value}`
    }
  }
}

const Number = {
  filters: {
    number(index, current) {
      return (current - 1) * 5 + index + 1
    }
  }
}

const fromNow = {
  filters: {
    fromNow(date) {
      return moment(date).fromNow()
    }
  }
}

const paymentImagepath = {
  filters: {
    paymentImagepath(path) {
      return `https://api.daguads.com/storage/${path}`
    }
  }
}
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue }) => {
  Vue.mixin(Imagefullurl)
  Vue.mixin(Number)
  Vue.mixin(fromNow)
  Vue.mixin(paymentImagepath)
}
