import { Routing } from '@/pages'
import { withProviders } from './providers'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
	return <Routing />
}

export default withProviders(App)
