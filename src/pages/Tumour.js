import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader } from '@dhis2/ui'
<<<<<<< HEAD
import React, { useState } from 'react'
=======

import { TumourTableView } from './TumourComponents/TumourTableView'
import { PaginationControls } from './TumourComponents/PaginationControls'

>>>>>>> b709c33a924866bcdd6f536424d742235905dba1
import * as classes from '../App.module.css'
import { PaginationControls } from './Tumour/PaginationControls'
import { TumourTableView } from './Tumour/TumourTableView'

const eventsQuery = {
    results: {
        resource: 'events',
        params: ({ page }) => ({
            page: page,
            orgUnit: 'OujzhM1lgN5',
            programStage: 'Y0cWLBEdXzb',
            pageSize: 5,
            fields: ['dataValues'],
            startDate: '2020-04-13',
            endDate: '2021-04-13',
        }),
    },
}

export const Tumour = () => {
    const { loading, error, data, refetch } = useDataQuery(eventsQuery, {
        variables: { page: 0 },
    })

    if (error) {
        return <span>ERROR: {error.message}</span>
    }

    if (loading) {
        return <CircularLoader />
    }

    return (
        <div className={classes.tableContainer}>
            <TumourTableView events={data.results.events} refetch={refetch} />
            <PaginationControls pager={data.results.pager} refetch={refetch} />
        </div>
    )
}
