import { useContext, useState } from 'react'
import Main from './components/Main'
import PathContext from './store/path-context-creator.js'
import SearhInput from './components/SearchInput'
import Dropdown from './components/Dropdown.jsx';

function App() {
  const [isFocus, setIsFocus] = useState(false);
  const { files, path, currentPath } = useContext(PathContext);

  let suggestions = files.folders.map(folder => folder.name);
  
  const filteredFolders = suggestions.filter((folder) =>
    (currentPath + folder).toLowerCase().startsWith(path.toLowerCase())
  );

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
      <Main items={files}/>
    </div>
  )
}

export default App
