import { AppSpinner } from '@/shared/ui'
import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const withRouter = (component: () => React.ReactNode) => () =>
	(
		<BrowserRouter>
			<Suspense fallback={<AppSpinner />}>{component()}</Suspense>
		</BrowserRouter>
	)
