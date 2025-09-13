import React from "react"
import { LayoutTemplate, X } from 'lucide-react';
import { landingPageStyles } from "../src/assets/dummyStyle";
const LandingPage=()=>{
    return(
        <div className={landingPageStyles.container}>
            <header className={landingPageStyles.header}>
                <div className={landingPageStyles.headerContainer}>
                     <div className={landingPageStyles.logoContainer}>
                        <div className={landingPageStyles.logoIcon}>
                              <LayoutTemplate className={landingPageStyles.logoIconInner}/>
                        </div>
                         <span className={landingPageStyles.logoText}>
                            Resumate
                         </span>
                     </div>
                         <button className={landingPageStyles.mobileMenuButton}
                            onClick={()=>{setMobileMenuOpen(!mobileMenuOpen)}}>
                            {mobileMenuOpen?
                            <X size={24} className={landingPageStyles.mobileMenuIcon}/>:
                            <Menu size={24} className={landingPageStyles.mobileMenuIcon}/>}
                     </button>
                    
                </div>
            </header>
        </div>
    )
}

export default LandingPage