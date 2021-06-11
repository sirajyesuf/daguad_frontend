import { Loading, QSpinnerBall } from 'quasar'
function DisplayLoading(ok) {
  if (ok)
    Loading.show({
      spinner: QSpinnerBall,
      spinnerSize: '2em'
    })
  else Loading.hide()
}

export default DisplayLoading
