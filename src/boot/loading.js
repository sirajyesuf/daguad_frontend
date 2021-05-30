import { Loading } from 'quasar'
function DisplayLoading(ok) {
  if (ok) Loading.show()
  else Loading.hide()
}

export default DisplayLoading
