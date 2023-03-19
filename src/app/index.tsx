import { Routing } from '@/pages'
import { withProviders } from './providers'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

const App = () => {
	return (
		<>
			<Routing />
			<ToastContainer />
		</>
	)
}

export default withProviders(App)
