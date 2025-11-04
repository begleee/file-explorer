import { useContext } from 'react'
import './SearchInput.css'
import PathContext from '../store/path-context-creator'

export default function SearhInput({...props}) {
  const {path, setPath, setCurrentPath} = useContext(PathContext);
  function handleChange(e) {
    setPath(e.target.value)
    setTimeout(() => {
      setCurrentPath(e.target.value)
    }, 1000);
  }
  return (
    <>
      <input
        value={path} 
        onChange={(e) => handleChange(e)} 
        className='search-input' 
        {...props} 
        type="text"
      />
    </>
  )
}
