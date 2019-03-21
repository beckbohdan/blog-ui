const initialStete = { loaded: false, list: [] };

export function categories(state = initialStete, action) {
  switch (action.type) {

    case 'ACTION_GET_CATEGORIES':
      return {
        ...state,
        loaded: true,
        list: action.payload
      };

    case 'ACTION_ADD_CATEGORIES':
      return {
        ...state,
        list: [...state.list, action.payload]
      };

    case 'ACTION_EDIT_CATEGORIES':
      return {
        ...state,

        list: [
          ...state.list.filter(category => action.payload.id !== category.id),
          action.payload
        ]
      };

    case 'ACTION_DELETE_CATEGORIES':
      return {
        ...state,
        list: [...state.list.filter(category => action.payload !== category.id)]
      };

    default:
      return state;
  }
}
