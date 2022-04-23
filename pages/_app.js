import React, { Suspense, useState } from 'react';

import { Provider } from 'react-redux';

import store from '../store/index';

// import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

// const SignUp = React.lazy(() => import('./sign-up'));
// const SignIn = React.lazy(() => import('./sign-in'));
// const Home = React.lazy(() => import('./index'));
// const Scope = React.lazy(() => import('./scope'));
// const ScopesManagement = React.lazy(() => import('./scope-management'));
// const Note = React.lazy(() => import('./note'));
// const NotesManagement = React.lazy(() => import('./note-management'));
// const ElementNote = React.lazy(() => import('./element-note'));
// const ElementNoteManagement = React.lazy(() => import('./element-note-management'));
// const Sources = React.lazy(() => import('./sources'));
// const AppInfo = React.lazy(() => import('./app-info'));
// const HelpCenter = React.lazy(() => import('./help-center'));
// const PageNotFound = React.lazy(() => import('./page-not-found'));

// const Nav = React.lazy(() => import('../components/nav'));
import Nav from '../components/nav';

// const ElementNoteModal = React.lazy(() => import('../components/ElementNoteModal'));
import ElementNoteModal from '../components/ElementNoteModal';

import '../styles/globals.css';
import './app.css';

function MyApp({ Component, pageProps }) {

  const [selectedLang, setLang] = useState('en');
  
  // return (
  //   <Suspense fallback={DownloadingAssetsMsgSpinner}>
  //     <div className='app-segment'>
  //         <ElementNoteModal/> 
  //         <Nav
  //           selectedLang = {selectedLang}
  //           setLang = {setLang}
  //         />
  //         <div className='pages-segment'>
  //           <Routes>
  //             <Route exact path='/' element={auth.userIsSignedIn ? <Home/> : <SignIn/>}/>
  //             <Route exact path='/sign-up' element={<SignUp/>}/>
  //             <Route exact path='/sign-in' element={<SignIn/>}/>
  //             <Route exact path='/home' element={<Home/>}/>
  //             <Route exact path='/scope' element={<Scope/>}/>
  //             <Route exact path='/scopes-management' element={<ScopesManagement/>}/>
  //             <Route exact path='/note' element={<Note/>}/>
  //             <Route exact path='/notes-management' element={<NotesManagement/>}/>
  //             <Route exact path='/add-element-note' element={<ElementNote/>}/>
  //             <Route exact path='/element-note-management' element={<ElementNoteManagement/>}/>
  //             <Route exact path='/sources' element={<Sources/>}/>
  //             <Route exact path='/app-info' element={<AppInfo/>}/>
  //             <Route exact path='/help-center' element={<HelpCenter/>}/>
  //             <Route path='*' element={<PageNotFound/>}/>
  //           </Routes>
  //         </div>
  //     </div>
  //   </Suspense>
  // );

  const DownloadingAssetsMsgSpinner = (
    <div className='fixed spinner-wrapper d-flex justify-content-center align-items-center'>
      <div className="spinner-grow text-primary m-1" role="status"></div>
      <div>Necessary assets are being downloaded</div>
    </div> 
  );
  
  return (
    <Provider store={store}>
      {/* <Suspense fallback={DownloadingAssetsMsgSpinner}> */}
        <div id='overlay-root'></div>
        <div className='app-segment'>
          <ElementNoteModal/> 
          <Nav
            selectedLang = {selectedLang}
            setLang = {setLang}
          />
          <div className='pages-segment'>
            <Component {...pageProps} />
          </div>
        </div>
        <div id='toasts-container-root'></div>
      {/* </Suspense> */}
    </Provider>
  );
}

export default MyApp;