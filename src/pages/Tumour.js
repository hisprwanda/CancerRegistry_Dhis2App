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
            fields: ['completedBy,dataValues[dataElement,value]'],
            startDate: '2020-05-01',
            endDate: '2021-05-26',
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

    if (error) { return <span>ERROR: {error.message}</span> }

    if (loading) {
        return (
            <>
                <h1>Tumour Data for Export</h1>
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
