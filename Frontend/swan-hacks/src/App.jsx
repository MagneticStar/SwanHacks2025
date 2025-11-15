import { BrowserRouter as Router, Routes, Route, useState } from 'react'
import './App.css'

import 




/**
 * This is the main screen that will always be showing (this will show different objects)
 */
function App() {

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    elo: ''

  });

  <Router>
    <div className="flex-grow">
      <Routes>
        // <Route path="/authors" element={<AboutUs />} />


      </Routes>
    </div>
  </Router>
}


export default App;
