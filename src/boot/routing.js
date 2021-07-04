// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files

export default async ({ app, router, Vue, store }) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.auth)) {
      if (!store.getters['user/isauth']) {
        next({
          name: 'signin',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    }
    if (to.matched.some((record) => record.meta.guest)) {
      if (store.getters['user/isauth']) {
        next(router.go(-1))
      } else {
        next()
      }
    } else {
      next()
    }
  })
}
