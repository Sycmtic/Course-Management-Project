import * as constants from "../constants/index"

export const WidgetReducer = (state = {widgets: [], preview: false}, action) => {
    let newState;
    switch (action.type) {
        case constants.PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
            };

        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.PARAGRAPH_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.paragraph = action.paragraph
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.LIST_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.listText = action.listText
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.LIST_TYPE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.IMAGE_URL_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.imageUrl = action.imageUrl
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LINK_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.linkText = action.linkText
                    }
                    return Object.assign({}, widget)
                })
            }
        case constants.LINK_URL_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.linkUrl = action.linkUrl
                    }
                    return Object.assign({}, widget)
                })
            }


        case constants.WIDGET_NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.name = action.name
                    }
                    return Object.assign({}, widget);
                })
            };

        case constants.SELECT_WIDGET_TYPE:
            console.log(action);
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            };
            return JSON.parse(JSON.stringify(newState));

        case constants.SAVE:
            console.log(state.widgets);
            fetch(`https://webdev-summer1-2018-1.herokuapp.com/api/topic/${action.topicId}/widget/save`, {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'}
            });
            return state;

        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state);
            newState.widgets = action.widgets;
            return newState;

        case constants.MOVE_UP_WIDGET:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.widgetOrder === action.order - 1) {
                        widget.widgetOrder++;
                    }
                    if (widget.id === action.id) {
                        widget.widgetOrder--;
                    }
                    return Object.assign({}, widget);
                })
            }
        case constants.MOVE_DOWN_WIDGET:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.widgetOrder === action.order + 1) {
                        widget.widgetOrder--;
                    }
                    if (widget.id === action.id) {
                        widget.widgetOrder++;
                    }
                    return Object.assign({}, widget);
                })
            }

        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            };

        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        widgetOrder: state.widgets.length + 1,
                        text: '',
                        widgetType: 'Heading',
                        size: '1',
                        listType: '1'
                    }
                ]
            };

        default:
            return state;
    }
};