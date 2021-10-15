
  

  
  function InputField({type,value,placeholder,onChange}){
    return(<div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}/>
      </div>);
  }
  
  
  
  

  export default function PersonForm({title,onSubmit, handleInputChange,values}){
    return(<form onSubmit={onSubmit}>
              <h2>{title}</h2>
              <InputField type='text' onChange={handleInputChange.name} value={values.name} placeholder='Name' />
              <InputField type='tel' onChange={handleInputChange.number} value={values.number} placeholder='Number' />
              <InputField type='submit' value='add' />
            </form>);
  
  }
  