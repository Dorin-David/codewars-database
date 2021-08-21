import style from '../../styles/components/kata.module.css';
function Kata(props) {
    return <div
        onClick={() => props.showKata(props.id)}
        className={style.wrapper}>
        <div className={style.inner}>{props.kataName}</div>
    </div>

}

export default Kata