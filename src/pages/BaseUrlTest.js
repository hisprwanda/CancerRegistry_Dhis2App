import React from 'react'
import { useConfig } from '@dhis2/app-runtime'

export const BaseUrlTest = () => {
    const { baseUrl, apiVersion } = useConfig()
    return(
    <div>
        <span>
            <strong>Base URL</strong> : {baseUrl}
        </span>
     
    </div>
    )
} 


