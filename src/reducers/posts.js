const initialStete = {
                       loaded: false,
                       list: [] 
                     };

export function posts(state = initialStete, action) {
  switch (action.type) {

    case 'ACTION_GET_POSTS':
      return {
        ...state,
        loaded: true,
        list: action.payload
      };

    case 'ACTION_ADD_POST':
      return {
        ...state,
        list: [...state.list, action.payload]
      };

    case 'ACTION_EDIT_POST':
      return {
        ...state,

        list: [
          ...state.list.filter(post => action.payload.id !== post.id),
          action.payload
        ]
      };

    case 'ACTION_DELETE_POST':
      return {
        ...state,
        list: [...state.list.filter(post => action.payload !== post.id)]
      };

    default:
      return state;
  }
}
