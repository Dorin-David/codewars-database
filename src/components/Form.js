import style from '../styles/components/form.module.css';
function Form(props) {
    return (<div className={style.wrapper}>
        <input type="text" placeholder="Lookup an user" 
        className={style.form}
        value={props.value} 
        onChange={e => props.handleFormChange(e)} 
        />
        <button className={style.button} onClick={props.submitSearch}>Search</button>
    </div>)

}

export default Form