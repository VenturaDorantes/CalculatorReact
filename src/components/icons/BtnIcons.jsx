const BtnIcons = (props) => {
   
    const { name, content, activate, updateColorActive } = props
   
    return (
    <div 
        className={activate ? 'btnIcon active': 'btnIcon'}
        onClick={ () => updateColorActive(name) }
        >
            {content}
    </div>
   )
    
}

export default BtnIcons