const KeyBottom = (props) =>{

    const { dataKey, cssClass, spanText } = props

    return(
        <div data-key={ dataKey } className={ !cssClass == '' ? 'key ' + cssClass : 'key'}>
            <span>{ spanText }</span>
        </div>
    )
}

export default KeyBottom