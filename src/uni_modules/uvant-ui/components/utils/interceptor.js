import { noop, isPromise } from './basic'

export function callInterceptor(interceptor, { args = [], done, canceled, error }) {
    if (interceptor) {
        const returnVal = interceptor.apply(null, args)

        if (isPromise(returnVal)) {
            returnVal
                .then((value) => {
                    if (value) {
                        done()
                    } else if (canceled) {
                        canceled()
                    }
                })
                .catch(error || noop)
        } else if (returnVal) {
            done()
        } else if (canceled) {
            canceled()
        }
    } else {
        done()
    }
}
