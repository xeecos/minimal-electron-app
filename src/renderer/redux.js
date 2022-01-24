import Communication from "./comm"
const reducer = (state, action) => {
    switch(action.type)  {
        case "connected":
            return  {
            ...state,
            connected: action.value
            }
        case "messages":
            if(action.action=="send")
            {
                Communication.send({
                    method:"serial",
                    action:"send",
                    data:action.value})
            }
            let messages = state.messages;
            messages.unshift({time:new Date(),action:action.action,data:action.value});
            if(messages.length>10)
            {
                messages.pop();
            }
            return  {
              ...state,
              messages
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