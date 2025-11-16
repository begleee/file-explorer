import { useContext, useState } from 'react'
import Main from './components/Main'
import PathContext from './store/path-context-creator.js'
import SearhInput from './components/SearchInput'
import Dropdown from './components/Dropdown.jsx';
import classes from './App.module.css'

function App() {
  const [organizeState, setOrganizeState] = useState('name-sort');
  const [typeState, setTypeState] = useState('ascending');

  function handleChoose(e) {
    setOrganizeState(e.target.value)
    console.log(e.target.value);
  }

  function handleType(e) {
    setTypeState(e.target.value);
    console.log(e.target.value)
  }

  const [isFocus, setIsFocus] = useState(false);
  const { files, path, currentPath } = useContext(PathContext);

  let suggestions = files.folders.map(folder => folder.name);
  
  const filteredFolders = suggestions.filter((folder) =>
    (currentPath + folder).toLowerCase().startsWith(path.toLowerCase())
  );

  if(organizeState === 'name-sort') {
    if(typeState === 'descending') {
      files.folders.sort((a, b) => b.name.localeCompare(a.name));
      files.documents.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      files.folders.sort((a, b) => a.name.localeCompare(b.name));
      files.documents.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  if(organizeState === 'date-sort') {
    if(typeState === 'descending') {
      files.folders.sort((a, b) => b.modified - a.modified);
      files.documents.sort((a, b) => b.modified - a.modified);
    } else {
      files.folders.sort((a, b) => a.modified - b.modified);
      files.documents.sort((a, b) => a.modified - b.modified);
    }
  }

  return (
    <div style={{
      padding: '2rem',
    }}>
      <details open={isFocus} style={{margin: '1rem', position: 'relative'}}>
        <summary style={{listStyle: 'none', display: 'flex'}}>
          <SearhInput
          className="search-input"
          placeholder="Enter folder path..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setTimeout(() => setIsFocus(false), 500) }
        /></summary>
        <Dropdown folders={filteredFolders}/>
      </details>

      <form className={classes.form}>
        <div>
          <label htmlFor="organize">Organize: </label>
          <select onChange={handleChoose} value={organizeState} className={classes.select} name="organize" id="">
            <optgroup className={classes.optgroup} label='Sort by'>
              <option className={classes.option} value="name-sort">Name</option>
              <option className={classes.option} value="date-sort">Date modified</option>
            </optgroup>
            <hr />
            <optgroup className={classes.optgroup} label='Group by'>
              <option className={classes.option} value="name-group">Name</option>
              <option className={classes.option} value="date-group">Date modified</option>
            </optgroup>
          </select>
        </div>
        <div>
          <label htmlFor="type">Type: </label>
          <select onChange={handleType} value={typeState} className={classes.select} name="type" id="">
            <option className={classes.option} value="ascending">Ascending</option>
            <option className={classes.option} value="descending">Descending</option>
          </select>
        </div>
      </form>

      <Main items={files}/>
    </div>
  )
}

export default App
