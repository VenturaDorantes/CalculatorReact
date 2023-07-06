const DisplayInput = (props) => {

    return (
        <div className="input" dangerouslySetInnerHTML={ { __html:  props.operation } }/>
    )
}

export default DisplayInput