function Form(props){
    return (<>
      <input type="text" placeholder="Lookup an user" value={props.value} onChange={e => props.handleFormChange(e)}/>
      <button onClick={props.submitSearch}>Search</button>
    </>)

}

export default Form