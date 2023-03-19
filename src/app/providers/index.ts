import compose from 'compose-function'
import { withErrorBoundary } from './with-error-boundary'
import { withRouter } from './with-router'
import { withStore } from './with-store'

export const withProviders = compose(withRouter, withStore, withErrorBoundary)
