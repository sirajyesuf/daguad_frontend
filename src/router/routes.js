const routes = [
  {
    path: '/account',
    component: () => import('layouts/AccountMainLayout.vue'),
    children: [
      {
        path: 'signup',
        name: 'signup',
        component: () => import('pages/account/Signup.vue'),
        meta: { guest: true }
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import('pages/account/Signin.vue'),
        meta: { guest: true }
      },
      {
        path: 'forgot_password',
        component: () => import('pages/account/ForgotYourPassword.vue'),
        meta: { guest: true }
      },
      {
        path: 'reset-password',
        component: () => import('pages/account/ResetPassword.vue'),
        meta: { guest: true }
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('pages/dashboard/Index.vue'),
    meta: { auth: true }
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

// http://localhost:5000/#/account/reset_password/a52abfdf4bf82f4aacd9a02da28583b4143132b14a323cc13170bcc0850e292c
