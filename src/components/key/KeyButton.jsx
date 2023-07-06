const KeyBottom = (props) =>{

    const { dataKey, cssClass, spanText, functionKey } = props

    return(
        <div data-key={ dataKey } className={ !cssClass == '' ? 'key ' + cssClass : 'key'} onClick={ () => functionKey(dataKey) }>
            <span>{ spanText }</span>
        </div>
    )
}

export default KeyBottom