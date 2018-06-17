import React from  'react'
import {connect} from 'react-redux'
import {MOVE_UP_WIDGET, MOVE_DOWN_WIDGET, DELETE_WIDGET} from "../constants/index"
import * as actions from '../actions'

const Heading = ({widget, preview, headingTextChanged, headingSizeChanged, widgetNameChanged}) => {
    let selectElem
    let inputElem
    let nameElem

    return(
        <div>
            <div hidden={preview}>
                <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       value={widget.text} placeholder="Heading text"
                       ref={node => inputElem = node}/>
                <select style={{margin:"25px 0px"}} className="custom-select" onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        value={widget.size}
                        ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <input style={{marginBottom:"25px"}} className="form-control" onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                       value={widget.name} placeholder="Widget name"
                       ref={node => nameElem = node}/>
                <h3>Preview</h3>
            </div>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
}
const dispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) =>
        actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize),
    widgetNameChanged: (widgetId, newName) =>
        actions.widgetNameChanged(dispatch, widgetId, newName),
    paragraphTextChanged: (widgetId, newParagraph) =>
        actions.paragraphTextChanged(dispatch, widgetId, newParagraph),
    listTextChanged: (widgetId, newListText) =>
        actions.listTextChanged(dispatch, widgetId, newListText),
    listTypeChanged: (widgetId, newListType) =>
        actions.listTypeChanged(dispatch, widgetId, newListType),
    imageUrlChanged: (widgetId, newImageUrl) =>
        actions.imageUrlChanged(dispatch, widgetId, newImageUrl),
    linkTextChanged: (widgetId, newLinkText) =>
        actions.linkTextChanged(dispatch, widgetId, newLinkText),
    linkUrlChanged: (widgetId, newLinkUrl) =>
        actions.linkUrlChanged(dispatch, widgetId, newLinkUrl)
})
const stateToPropsMapper = state => ({
    preview: state.preview
})
const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading)


const Paragraph = ({widget, preview, paragraphTextChanged, widgetNameChanged}) => {
    let textElem
    let nameElem

    return(
        <div>
            <div hidden={preview}>
                <textarea className="form-control" onChange={() => paragraphTextChanged(widget.id, textElem.value)}
                value={widget.paragraph} placeholder="Paragraph text" ref={node => textElem = node}></textarea>
                <input style={{margin:"25px 0"}} className="form-control" onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                       value={widget.name} placeholder="Widget name"
                       ref={node => nameElem = node}/>
                <h3>Preview</h3>
            </div>
            <p>{widget.paragraph}</p>
        </div>
    )
}
const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph)


const List = ({widget, preview, listTextChanged, listTypeChanged, widgetNameChanged}) => {
    let listElem
    let selectElem
    let nameElem

    return(
        <div>
            <div hidden={preview}>
                <textarea className="form-control" onChange={() => listTextChanged(widget.id, listElem.value)}
                          value={widget.listText || ""} placeholder="List text" ref={node => listElem = node}></textarea>
                <select style={{margin:"25px 0px"}} className="custom-select" onChange={() => listTypeChanged(widget.id, selectElem.value)}
                        value={widget.listType}
                        ref={node => selectElem = node}>
                    <option value="1">Unordered list</option>
                    <option value="2">Ordered list</option>
                </select>
                <input style={{marginBottom:"25px"}} className="form-control" onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                       value={widget.name} placeholder="Widget name"
                       ref={node => nameElem = node}/>
                <h3>Preview</h3>
            </div>
            {console.log(widget)}
            {widget.listType == "1" && widget.listText !== undefined && <ul>{widget.listText.split("\n").map(listText => (
                <li>{listText}</li>
            ))}</ul>}
            {widget.listType == "2" && widget.listText !== undefined && <ol>{widget.listText.split("\n").map(listText => (
                <li>{listText}</li>
            ))}</ol>}
        </div>
    )
}
const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List)


const Image = ({widget, preview, imageUrlChanged, widgetNameChanged}) => {
    let urlElem
    let nameElem

    return (
        <div>
            <div hidden={preview}>
                <input className="form-control" onChange={() => imageUrlChanged(widget.id, urlElem.value)}
                   value={widget.imageUrl} placeholder="Image URL" style={{display: "block"}}
                   ref={node => urlElem = node}/>
                <input style={{margin:"25px 0"}} className="form-control" onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                       value={widget.name} placeholder="Widget name"
                       ref={node => nameElem = node}/>
                <h3>Preview</h3>
            </div>
            <img src={widget.imageUrl}/>
        </div>
    )
}
const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image)


const Link = ({widget, preview, linkTextChanged, linkUrlChanged, widgetNameChanged}) => {
    let textElem
    let urlElem
    let nameElem

    return (
        <div>
            <div hidden={preview}>
                <input className="form-control" onChange={() => linkTextChanged(widget.id, textElem.value)}
                       value={widget.linkText} placeholder="Link text"
                       ref={node => textElem = node}/>
                <input style={{marginTop:"25px"}} className="form-control" onChange={() => linkUrlChanged(widget.id, urlElem.value)}
                       value={widget.linkUrl} placeholder="Link URL"
                       ref={node => urlElem = node}/>
                <input style={{margin:"25px 0"}} className="form-control" onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                       value={widget.name} placeholder="Widget name"
                       ref={node => nameElem = node}/>
                <h3>Preview</h3>
            </div>
            <a href={widget.linkUrl}>{widget.linkText}</a>
        </div>
    )
}
const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link)

const Widget = ({widget, length, preview, dispatch}) => {
    let selectElement

    return(
        <li>
            <div className="container" style={{border: "1px solid", borderColor: "#E8E8E8"}}>
            <div hidden={preview}>
                <div className="button-container" style={{justifyContent: "space-between", marginTop: "10px", marginBottom: "5px"}}>
                <h3 style={{display: "inline", float:"left"}}>{widget.widgetType} widget</h3>

                <div style={{float: "right", position: "relative"}}>
                    {widget.widgetOrder > 1 && <button style={{marginRight: "3px", marginLeft: "3px"}} type="button" className="btn btn-warning" onClick={e => (dispatch({type: MOVE_UP_WIDGET, id: widget.id, order: widget.widgetOrder})
                    )}><i className="fas fa-arrow-up"></i></button>}
                    {widget.widgetOrder < length && <button style={{marginRight: "3px", marginLeft: "3px"}} type="button" className="btn btn-warning" onClick={e => (dispatch({type: MOVE_DOWN_WIDGET, id: widget.id, order: widget.widgetOrder})
                    )}><i className="fas fa-arrow-down"></i></button>}


                    <select className="custom-select" style={{display:"inline", width:"117px"}} value={widget.widgetType}
                            onChange={e =>
                                dispatch({
                                    type: 'SELECT_WIDGET_TYPE',
                                    id: widget.id,
                                    widgetType: selectElement.value
                                })} ref={node => selectElement = node}>
                        <option>Heading</option>
                        <option>Paragraph</option>
                        <option>List</option>
                        <option>Image</option>
                        <option>Link</option>
                    </select>

                    <button style={{marginRight: "3px", marginLeft: "3px"}} type="button" className="btn btn-danger" onClick={e => (
                        dispatch({type: DELETE_WIDGET, id: widget.id})
                    )}>X</button>
                </div>
                </div>
            </div>
            <div>
                {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType==='Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType==='List' && <ListContainer widget={widget}/>}
                {widget.widgetType==='Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType==='Link' && <LinkContainer widget={widget}/>}
            </div>
            </div>
        </li>
    )
}
const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget)
export default WidgetContainer