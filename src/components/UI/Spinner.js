import style from '../../styles/components/UI/spinner.module.css';

function Spinner(){
    return <div className={style["lds-ripple"]}><div></div><div></div></div>
}

export default Spinner