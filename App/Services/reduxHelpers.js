export const RESET_STORE = 'RESET_STORE'

export const createReducer = (initialState, handlers, finalizer = x => x) => (state = initialState, action) => {
  if (action.type) {
    const handler = handlers[action.type]
    if (handler) {
      const result = handler(state, action)
      if (result === RESET_STORE) {
        return initialState
      }
      if (result === null && typeof result === 'object') {
        return state
      }
      return finalizer({ ...state, ...result })
    }
  }
  return state
}

export const createAsyncType = action => ({
  ATTEMPT: `${action}.ATTEMPT`,
  SUCCESS: `${action}.SUCCESS`,
  FAILURE: `${action}.FAILURE`,
})

export const createAsyncAction = type => ({
  Attempt: ({ ...props }) =>
    ({
      type: type.ATTEMPT,
      ...props,
    }),
  Success: ({ ...payload }) =>
    ({
      type: type.SUCCESS,
      ...payload,
    }),
  Failure: ({ ...props }) =>
    ({
      type: type.FAILURE,
      ...props,
    }),
})
