const routes = [
  {
    path: '/account',
    component: () => import('layouts/AccountMainLayout.vue'),
    meta: { guest: true },
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
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/Index.vue')
      },
      {
        path: 'channels',
        component: () => import('layouts/ChannelMainLayout.vue'),
        children: [
          {
            path: '',
            name: 'list_channel',
            component: () => import('pages/dashboard/channels/Index.vue')
          },
          {
            path: 'addchannel',
            name: 'add_channel',
            component: () => import('pages/dashboard/channels/AddChannel.vue')
          },
          {
            path: 'post_history/:id',
            component: () => import('pages/dashboard/channels/History.vue'),
            name: 'channel_post_history'
          },
          {
            path: 'earning',
            name: 'earning',
            component: () => import('pages/dashboard/channels/Earning.vue')
          }
        ]
      },
      {
        path: 'campaign',
        component: () => import('layouts/CampaignMainLayout.vue'),
        children: [
          {
            path: '',
            name: 'campaign_list',
            component: () => import('pages/dashboard/campaign/Index.vue')
          },
          {
            path: 'create_campaign',
            name: 'create_campaign',
            component: () => import('pages/dashboard/campaign/AddCampaign.vue')
          },
          {
            path: 'campaign-detail/:id',
            name: 'campaign-detail',
            component: () => import('pages/dashboard/campaign/Detail.vue')
          },
          {
            path: 'edit_campaign/:id',
            name: 'edit_campaign',
            component: () =>
              import('pages/dashboard/campaign/neweditcampaign.vue')
          },
          {
            path: 'fuck/:id',
            name: 'edit_campaign',
            component: () => import('pages/dashboard/campaign/EditCampaign.vue')
          },
          {
            path: 'campaign_history/:id',
            name: 'campaign_history',
            component: () => import('pages/dashboard/campaign/History.vue')
          },
          {
            path: 'campaign_payment/:id',
            name: 'campaign_payment',
            component: () => import('src/pages/dashboard/campaign/Payment.vue')
          }
        ]
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('src/pages/dashboard/settings/index.vue')
      },
      {
        path: 'payment',
        name: 'payment',
        component: () => import('src/pages/dashboard/PaymentHistory.vue')
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('src/pages/dashboard/DisplayNotifications.vue')
      },
      {
        path: 'notifications/:id',
        name: 'read_notification',
        component: () => import('src/pages/dashboard/ReadNotification.vue')
      }
    ]
  },
  // {
  //   path: '/',
  //   name: 'wellcome',
  //   component: () => import('pages/Wellcome.vue')
  // },
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/landingpage.vue')
      },
      {
        path: '/privacypolicy',
        name: 'privacypolicy',
        component: () => import('pages/privacypolicy.vue')
      },
      {
        path: '/contactus',
        name: 'contactus',
        component: () => import('pages/contactus.vue')
      },
      {
        path: '/aboutus',
        name: 'aboutus',
        component: () => import('pages/aboutus.vue')
      }
    ]
  },
  {
    path: '/500',
    name: '500',
    component: () => import('pages/errors/Error500.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('pages/errors/Error403.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('src/pages/errors/Error404.vue')
  }
]

export default routes

// http://localhost:5000/#/account/reset_password/a52abfdf4bf82f4aacd9a02da28583b4143132b14a323cc13170bcc0850e292c
// http://localhost:5000/dashboard/campaign/payment/2
