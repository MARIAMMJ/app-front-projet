import React, {useEffect, useState} from 'react';
import {FiChevronUp} from "react-icons/fi";


const ScrollTop = () => {
    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
          setVisible(true)
        } 
        else if (scrolled <= 300){
          setVisible(false)
        }
    };
    const scrollToTop = () =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    };
    
    
    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
            return(() => {
                window.removeEventListener('scroll', toggleVisible);
            });
        });
    return (
        <>
            <div 
            className="rn-back-top" 
            onClick={scrollToTop}
            style={{display: visible ? 'inline' : 'none'}}
            ><FiChevronUp /></div>
            
        </>
    )
}

export default ScrollTop;