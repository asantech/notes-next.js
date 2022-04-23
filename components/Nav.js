import { Fragment, useState, useEffect, useCallback } from 'react';

import ReactDOM from 'react-dom';

import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '../store/auth-actions';

import Link from 'next/link';

import { useHttpClient } from '../shared/hooks/http-hook';
 
import ReactTooltip from 'react-tooltip';

import { Button, Modal } from 'react-bootstrap';

import { HouseDoorFill, Plus, CardText, BoxArrowInRight, Gear ,InfoCircle ,JournalText, FolderPlus, Folder, Diagram3, PersonPlusFill, PersonCircle, QuestionCircle} from 'react-bootstrap-icons';

import classes from './Nav.module.css';
 
function Nav(props){

    let
        selectedLang = props.selectedLang,
        setLang = props.setLang
    ;

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [showSettingsModal, setSettingsModalDisplay] = useState(false);

    function changeLangHandler(){
        if(selectedLang === 'en')
            setLang('fa');
        else if(selectedLang === 'fa')
            setLang('en');
    }

    function SettingsModal() {

        const {isLoading, sendRequest} = useHttpClient();

        const handleClose = () => setSettingsModalDisplay(false);
        const [serverCodeStructure, setServerCodeStructure] = useState();

        const fetchSettingsDataHandler = useCallback(async () => {

            try{
                const resData = await sendRequest('http://localhost:5000/api/server-code-structure'); // بعدا نامگذاری اصلاح شود
    
                setServerCodeStructure(resData[0].structure);
 
            }catch(err){
 
            }
        },[]);

        function onEnterHandler(){
            // fetchSettingsDataHandler();
        }

        function serverCodeTypeRadioBtnOnClickHandler(e){
            setServerCodeStructure(e.target.getAttribute('data-val'));
        }

        async function saveSettingsHandler(){ // آیا از callback استفاده شود؟
     
            try{
                await sendRequest(
                    'http://localhost:5000/api/server-code-structure',
                    'POST',
                    undefined,
                    JSON.stringify({
                        structure: serverCodeStructure,
                    }),
                );
            }catch(err){

            }
            handleClose();
        }

        function saveBtnOnClickHandler(){
            saveSettingsHandler();
        }

        function themeOnChangeHandler(){

        }

        function languageOnChangeHandler(){

        }
 
        return (
            <Modal 
                show={showSettingsModal} 
                onHide={handleClose}
                onEntered={onEnterHandler}
            >
                <div className={'spinner-wrapper d-flex justify-content-center align-items-center' + ( isLoading ? '' : ' visually-hidden' )}>
                    <div className="spinner-border text-info" role="status"></div>
                    <span>Loading...</span>
                </div>
                <Modal.Header closeButton>
                    <Modal.Title>Settings Modal</Modal.Title>
                    <InfoCircle/>
                </Modal.Header>
                <Modal.Body>
                    <h5>Server Code Type</h5>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" data-val="mongo" name="server-code-type" id="server-code-type-mongo" checked={serverCodeStructure === 'mongo' ? 'checked' : ''} onChange={serverCodeTypeRadioBtnOnClickHandler}/>
                        <label className="form-check-label" htmlFor="server-code-type-mongo">
                            Mongo
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" data-val="mongoose" name="server-code-type" id="server-code-type-mongoose" checked={serverCodeStructure === 'mongoose' ? 'checked' : ''} onChange={serverCodeTypeRadioBtnOnClickHandler}/>
                        <label className="form-check-label" htmlFor="server-code-type-mongoose">
                            Mongoose
                        </label>
                    </div>
                    <hr></hr>
                    <h5>Themes</h5>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" data-val="light" name="theme" id="theme-light" defaultChecked onChange={themeOnChangeHandler}/>
                        <label className="form-check-label" htmlFor="theme-light">
                            Light
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" data-val="dark" name="theme" id="theme-dark" onChange={themeOnChangeHandler}/>
                        <label className="form-check-label" htmlFor="theme-dark">
                            Dark
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" data-val="aqua" name="theme" id="theme-aqua" onChange={themeOnChangeHandler}/>
                        <label className="form-check-label" htmlFor="theme-aqua">
                            Aqua
                        </label>
                    </div>
                    <hr></hr>
                    <h5>Language</h5>
                    <div className="form-check form-check-inline">
                        <input id="language-english" className="form-check-input" type="radio" data-val="en" name="language" defaultChecked onChange={languageOnChangeHandler}/>
                        <label className="form-check-label" htmlFor="language-english">
                            English
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input id="language-farsi" className="form-check-input" type="radio" data-val="fa" name="language" onChange={languageOnChangeHandler}/>
                        <label className="form-check-label" htmlFor="language-farsi">
                            Farsi
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveBtnOnClickHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function settingsBtnOnClickHandler(){
        setSettingsModalDisplay(true);
    }

    function signOutBtnOnClickHandler(){
        dispatch(signOut());
    }

    useEffect(()=>{
        ReactDOM.createPortal(
            <SettingsModal/>,
            document.getElementById('overlay-root')
        );
    },[]);
 
    return (
        <Fragment>
            <nav className={classes['nav']}>
                {
                    !auth.userIsSignedIn && 
                    <>
                        <span className={classes['log-in-page-welcome-msg']}>
                            You will get the best user experience by using Notes app :-)
                        </span>
                        <ul className={classes['nav-links-list']}>
                            <li className={classes['right-aligned']}> 
                                <Link href="/sign-in" className="tooltip-box" activeclassname="active" exact="true" data-tip data-for="sign-in-tip">
                                    <PersonCircle/>
                                </Link>
                                <ReactTooltip id="sign-in-tip" place="bottom" effect="solid">
                                    Sign In
                                </ReactTooltip>
                            </li>
                            <li>
                                <Link href="/sign-up" className="tooltip-box" activeclassname="active" exact="true" data-tip data-for="sign-up-tip">
                                    <PersonPlusFill/>
                                </Link>
                                <ReactTooltip id="sign-up-tip" place="bottom" effect="solid">
                                    Sign Up
                                </ReactTooltip>
                            </li>
                        </ul>
                    </>
                }
                {
                    auth.userIsSignedIn &&
                    <ul className={classes['logged-in-nav-links-list']+' '+classes['nav-links-list']}>
                        <li>
                            <Link href="/home" className="tooltip-box" activeclassname="active" exact="true" data-tip data-for="home-tip">
                                <HouseDoorFill/>
                            </Link>
                            <ReactTooltip id="home-tip" place="bottom" effect="solid" arrow>
                                Home
                            </ReactTooltip>
                        </li>
                        <li>
                            <Link href="/scope" className="tooltip-box" activeclassname="active" exact="true" data-tip data-for="scope-tip">
                                <FolderPlus/>
                            </Link>
                            <ReactTooltip id="scope-tip" place="bottom" effect="solid" arrow>
                                Scope
                            </ReactTooltip>
                        </li>
                        <li className='tooltip-box'>
                            <Link href="/scope-management" activeclassname="active" exact="true" data-tip data-for="scope-managment">
                                <Folder/>
                            </Link>
                            <ReactTooltip id="scope-managment" place="bottom" effect="solid">
                                Scope Managment
                            </ReactTooltip>
                        </li>
                        <li>
                            <Plus/>
                            <Link href="/note" className="tooltip-box" activeclassname="active" exact="true" data-tip data-for="note-tip">
                                <CardText/>
                            </Link>
                            <ReactTooltip id="note-tip" place="bottom" effect="solid" arrow>
                                Note
                            </ReactTooltip>
                        </li>
                        <li>
                            <Link href="/note-management" className="tooltip-box" activeclassname="active" exact="true" data-tip data-for="note-management-tip">
                                <CardText/>
                            </Link>
                            <ReactTooltip id="note-management-tip" place="bottom" effect="solid">
                                Note Management
                            </ReactTooltip>
                        </li>
                        <li>
                            <Plus/>
                            <Link href="/element-note" className="tooltip-box" activeclassname="active" exact="true" data-tip data-for="element-note-tip">
                                <JournalText/>
                            </Link>
                            <ReactTooltip id="element-note-tip" place="bottom" effect="solid">
                                Element Note
                            </ReactTooltip>
                        </li>
                        <li>
                            <Link href="/element-note-management" className="tooltip-box" activeclassname="active" exact="true" data-tip data-for="element-note-management-tip">
                                <JournalText/>
                            </Link>
                            <ReactTooltip id="element-note-management-tip" place="bottom" effect="solid">
                                Element Note Management
                            </ReactTooltip>
                        </li>
                        <li>
                            <Link href="/sources" className="tooltip-box" activeclassname="active" exact="true" data-tip data-for="sources-tip">
                                <Diagram3/>
                            </Link>
                            <ReactTooltip id="sources-tip" place="bottom" effect="solid">
                                Sources
                            </ReactTooltip>
                        </li>
                        <li>
                            <Link href="/app-info" className="tooltip-box" activeclassname="active" exact="true" data-tip data-for="app-info-tip">
                                <InfoCircle/>
                            </Link>
                            <ReactTooltip id="app-info-tip" place="bottom" effect="solid">
                                App Info
                            </ReactTooltip>
                        </li>
                        <li className={classes['right-aligned']}>
                            <Link href="/help-center" className="tooltip-box" activeclassname="active" exact="true" data-tip data-for="help-center-tip">
                                <QuestionCircle/>
                            </Link>
                            <ReactTooltip id="help-center-tip" place="bottom" effect="solid">
                                Help Center
                            </ReactTooltip>
                        </li>
                        {
                            selectedLang === 'fa' && 
                            <li className={classes['small bordered padded']} onClick={changeLangHandler}>
                                <button>
                                    En
                                </button>
                            </li>
                        }
                        {
                            selectedLang === 'en' && 
                            <li className={classes['small bordered padded']} onClick={changeLangHandler}>
                                <button>
                                    Fa
                                </button>
                            </li>
                        }
                        <li>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={settingsBtnOnClickHandler}>
                                <Gear/>
                            </button>
                        </li>
                        <li>
                            <Link href="/" activeclassname="active" exact="true" onClick={signOutBtnOnClickHandler}>
                                <BoxArrowInRight/>
                            </Link>
                        </li>
                    </ul>
                }
            </nav>
            {/* {ReactDOM.createPortal(
                <SettingsModal/>,
                document.getElementById('overlay-root')
            )} */}
        </Fragment>
    );
}

export default Nav;