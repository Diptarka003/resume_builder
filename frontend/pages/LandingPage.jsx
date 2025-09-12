import React from "react"
import { LayoutTemplate } from 'lucide-react';
import { landingPageStyles } from "../src/assets/dummyStyle";
const LandingPage=()=>{
    return(
        <div className={landingPageStyles.container}>
            <header className={landingPageStyles.header}>
                <div className={landingPageStyles.headerContainer}>
                     <div className={landingPageStyles.logoContainer}>
                        <div className={landingPageStyles.logoIcon}>
                              <LayoutTemplate className={landingPageStyles.logoIconInner}/>
                              <span className={landingPageStyles.logoText}>
                           
                              </span>
                        </div>
                     </div>
                </div>
            </header>
        </div>
    )
}

<div className={landingPageStyles.logoIconInner}>
                                <div className={landingPageStyles.logoText}>
                                    <div className={landingPageStyles.mobileMenuButton}>
                                        <div className={landingPageStyles.mobileMenuIcon}>
                                                  hello world
                                        </div>
                                    </div>
                                </div>
                            </div>

export default LandingPage