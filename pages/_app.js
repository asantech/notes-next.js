import { useContext ,useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import AuthContext from '../contexts/auth-context';
import { NotableElementsContextProvider } from '../contexts/notable-elements-context';

import SignUp from './sign-up';
import SignIn from './sign-in';
import Home from './Home';
import AddScope from './scope';
import ScopesManagement from './scope-management';
import Note from './Note';
import NotesManagement from './note-management';
import AddElementNote from './element-note';
import ElementNoteManagement from './element-note-management';
import Sources from './Sources';
import AppInfo from './app-info';
import HelpCenter from './help-center';

// import Nav from'../components/Nav';

import ElementNoteModal  from '../components/ElementNoteModal';

import '../styles/globals.css';
import './app.css';

function MyApp({ Component, pageProps }) {

  // const authContext = useContext(AuthContext);

  // const [selectedLang, setLang] = useState('en');

  // <div className='app-segment'>
  //   <NotableElementsContextProvider>
  //     <ElementNoteModal/> 
  //     <Nav
  //       selectedLang = {selectedLang}
  //       setLang = {setLang}
  //     />
  //     <div className='pages-segment'>
  //       <Routes>
  //         <Route path='/' element={authContext.userIsSignedIn ? <Home/> : <SignUp/>}/>
  //         <Route path='/sign-up' element={<SignUp/>}/>
  //         <Route exact path='/sign-in' element={<SignIn/>}/>
  //         <Route exact path='/home' element={<Home/>}/>
  //         <Route exact path='/add-scope' element={<AddScope/>}/>
  //         <Route exact path='/scopes-management' element={<ScopesManagement/>}/>
  //         <Route exact path='/note' element={<Note/>}/>
  //         <Route exact path='/notes-management' element={<NotesManagement/>}/>
  //         <Route exact path='/add-element-note' element={<AddElementNote/>}/>
  //         <Route exact path='/element-note-management' element={<ElementNoteManagement/>}/>
  //         <Route exact path='/sources' element={<Sources/>}/>
  //         <Route exact path='/app-info' element={<AppInfo/>}/>
  //         <Route exact path='/help-center' element={<HelpCenter/>}/>
  //       </Routes>
  //     </div>
  //   </NotableElementsContextProvider>
  // </div>
  
  return <Component {...pageProps} />
}

export default MyApp;