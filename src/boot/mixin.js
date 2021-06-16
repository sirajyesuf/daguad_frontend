// import something here

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

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue }) => {
  Vue.mixin(Imagefullurl)
  Vue.mixin(Number)
}
