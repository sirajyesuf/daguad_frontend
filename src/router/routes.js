const routes = [
  {
    path: '/account',
    component: () => import('layouts/AccountMainLayout.vue'),
    children: [
      {
        path: 'signup',
        name: 'signup',
        component: () => import('pages/account/Signup.vue')
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import('pages/account/Signin.vue')
      },
      {
        path: 'forgot_password',
        component: () => import('pages/account/ForgotYourPassword.vue')
      },
      {
        path: 'reset-password',
        component: () => import('pages/account/ResetPassword.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/Index.vue')
      },
      {
        path: 'channels',
        component: () => import('pages/dashboard/channels/Index.vue')
      },
      {
        path: 'campaign',
        component: () => import('layouts/CampaignMainLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/dashboard/campaign/Index.vue')
          },
          {
            path: 'new_campaign',
            component: () => import('pages/dashboard/campaign/NewCampaign.vue')
          },
          {
            path: 'campaign_history/:id',
            name: 'campaign_history',
            component: () => import('pages/dashboard/campaign/History.vue')
          },
          {
            path: 'payment/:id',
            name: 'campaign_payment',
            component: () => import('pages/dashboard/Payment.vue')
          }
        ]
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/dashboard/Settings.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'wellcome',
    component: () => import('pages/Wellcome.vue')
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
// http://localhost:5000/dashboard/campaign/payment/2
