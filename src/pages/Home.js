import React from 'react'
import i18n from '../locales/index.js'

export const Home = () => (
    <div>
        <h1>{i18n.t('Home page')}</h1>

        <h3>{i18n.t('Cancer Registry')} {i18n.t('in')} Rwanda</h3>
        <p>
            {i18n.t('Use the left menu to view, filter and export data to')}
            <strong> CanReg5</strong>
        </p>
    </div>
)
