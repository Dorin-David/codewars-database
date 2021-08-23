import KataCard from './KataCard';

const style = {display: "flex", flexWrap: "wrap", justifyContent: "center"}

function Katas(props){
    return (<div style={style}>
        {props.katas.map(kata => <KataCard key={kata.id} id={kata.id} kataName={kata.name} showKata={props.showKata}/>)}
    </div> )
}

export default Katas  