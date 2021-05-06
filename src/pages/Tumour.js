import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader,InputField, OrganisationUnitTree } from '@dhis2/ui'
import React, { useState } from 'react'

import { TumourTableView } from './TumourComponents/TumourTableView'
import { PaginationControls } from './TumourComponents/PaginationControls'
import styles from './Form.module.css'

import * as classes from '../App.module.css'


const eventsQuery = {
    results: {
        resource: 'events',
        params: ({ page }) => ({
            page: page,
            orgUnit: 'OujzhM1lgN5',
            program: 'rx6V962E4XM',
            programStage: 'Y0cWLBEdXzb',
            pageSize: 5,
            fields: ['dataValues[dataElement,value]'],
            startDate: '2020-04-13',
            endDate: '2021-04-13',
        }),
    },
}

export const Tumour = () => {
    const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const onChange = (ev) =>{
    console.log("Selected Orgunit", ev.path);
  }
    const { loading, error, data, refetch } = useDataQuery(eventsQuery, {
        variables: { page: 0 },
    })

    if (error) {
        return <span>ERROR: {error.message}</span>
    }

    if (loading) {

        return (
            <>
                    <h1>Tumour Data for Export</h1>

        <div style={{ border: '1px solid #c4c9cc', padding: 8, width: '100%' }} className={styles.row}>
            <div>
                <OrganisationUnitTree
                    onChange={onChange}
                    // singleSelection
                    name="Burato District"
                    roots={['dxpTd93bjuK']}
                    // selected={['dxpTd93bjuK/OujzhM1lgN5']}
                    highlighted={['dxpTd93bjuK/OujzhM1lgN5']}
                    initiallyExpanded={['dxpTd93bjuK']}
                />

            </div>
            
            <div style={{ border: '1px solid #c4c9cc', padding: 8, width: '30%' }}>
              <InputField label="From" type="date" value={dateFrom} onChange={({ value }) => setDateFrom(value)} />
            </div>
            <div style={{ border: '1px solid #c4c9cc', padding: 8, width: '30%' }}>
              <InputField label="To" type="date" value={dateTo} onChange={({ value }) => setDateTo(value)} />
            </div>
        </div>
        
        <CircularLoader />
        </>
        )
    }

    return (
        <div className={classes.tableContainer}>
            <TumourTableView events={data.results.events} refetch={refetch} />
            <PaginationControls pager={data.results.pager} refetch={refetch} />
        </div>
    )
}
