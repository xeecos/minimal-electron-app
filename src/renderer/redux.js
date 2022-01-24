
const reducer = (state, action) => {
    switch(action.type)  {
        case "connected":
            return  {
            ...state,
            connected: action.value
            }
        case "messages":
            return  {
              ...state,
              messages: action.value
            }
        case "ports":
            return  {
              ...state,
              ports: action.value
            }
        case "port":
            return  {
                ...state,
                port: action.value
            }
        case "baudRate":
            return  {
                ...state,
                baudRate: action.value
            }
        case "lineEnd":
            return  {
                ...state,
                lineEnd: action.value
            }
        default:
            return  state;
    }
}
export default reducer;