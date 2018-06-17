import * as constants from "../constants/index"

export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
)
export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    })
)

export const paragraphTextChanged = (dispatch, widgetId, newParagraph) => (
    dispatch({
        type: constants.PARAGRAPH_TEXT_CHANGED,
        id: widgetId,
        paragraph: newParagraph
    })
)

export const listTextChanged = (dispatch, widgetId, newListText) => (
    dispatch({
        type: constants.LIST_TEXT_CHANGED,
        id: widgetId,
        listText: newListText
    })
)
export const listTypeChanged = (dispatch, widgetId, newListType) => (
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newListType
    })
)

export const imageUrlChanged = (dispatch, widgetId, newImageUrl) => (
    dispatch({
        type: constants.IMAGE_URL_CHANGED,
        id: widgetId,
        imageUrl: newImageUrl
    })
)

export const linkTextChanged = (dispatch, widgetId, newLinkText) => (
    dispatch({
        type: constants.LINK_TEXT_CHANGED,
        id: widgetId,
        linkText: newLinkText
    })
)
export const linkUrlChanged = (dispatch, widgetId, newLinkUrl) => (
    dispatch({
        type: constants.LINK_URL_CHANGED,
        id: widgetId,
        linkUrl: newLinkUrl
    })
)

export const widgetNameChanged = (dispatch, widgetId, newName) => (
    dispatch({
        type: constants.WIDGET_NAME_CHANGED,
        id: widgetId,
        name: newName
    })
)

export const findAllWidgetsForTopic = (dispatch, topicId) => {
    fetch(`https://webdev-summer1-2018-1.herokuapp.com/api/topic/${topicId}/widget`)
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets }))
}
export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
)
export const save = (dispatch, topicId) => (
    dispatch({
        type: constants.SAVE,
        topicId: topicId
    })
)
export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
)