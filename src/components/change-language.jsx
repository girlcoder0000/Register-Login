import React, { useContext, useEffect, useRef, useState } from 'react'
import faFlag from '@assets/images/faFlag.png'
import usFlag from '@assets/images/usFlag.png'
import { AppContext } from '../contexts/app/app-context'
import { changeLanguage } from 'i18next'
import { set } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

function ChangeLanguage() {
    const [show,setShow] = useState(false)
    const {t}=useTranslation()
    // تشخیص کلیک خارج کامپوننت
   const ref= useRef()
   const {language,ChangeLanguage}=useContext(AppContext)
   useEffect(()=>{
    
        setShow(false)
    
   },[language])
    useEffect(()=>{
        const checkIfClickOutside = e=>{
            if(show && ref.current && !ref.current.contains(e.target)){
            setShow(false)
            }
        }
        document.addEventListener('mousedown',checkIfClickOutside)
        return()=>{
            document.removeEventListener('mousedown',checkIfClickOutside)
        }
    },[show])
  return (
    <div className='dropdown'>
        <a className='nav-flag dropdown-toggle' onClick={()=>setShow(true)}>
        <img src={language==='fa'?faFlag:usFlag} alt='farsi'></img>
        </a>
        <div ref={ref} className={`dropdown-menu dropdown-menu-end ${show?'show':undefined}`}>
            <a className='dropdown-item fw-bolder d-flex align-items-center gap-2' style={{textAlign:language==='fa'?"right":"left"}} onClick={()=>ChangeLanguage('fa')}>
                <img src={faFlag} width="20" className='ms-2'></img>
                <span className='align-middle'>{t('language.persian')}</span>
            </a>
            <a className='dropdown-item fw-bolder d-flex align-items-center gap-2'style={{textAlign:language==='fa'?"right":"left"}} onClick={()=>ChangeLanguage('en')}>
                <img src={usFlag} width="20" className='ms-2'></img>
                <span className='align-middle'>{t('language.English')}</span>
            </a>
        </div>
    </div>
  )
}
export default ChangeLanguage