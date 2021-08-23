import style from '../../styles/components/form.module.css'
function Button(props){
    return <button className={style.button}>{props.children}</button>
}

export default Button