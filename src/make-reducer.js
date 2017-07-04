export default (reducers, initState = null) => 
  (state = initState, action) =>
    action.type in reducers? 
    reducers[action.type](state, action): 
    state
