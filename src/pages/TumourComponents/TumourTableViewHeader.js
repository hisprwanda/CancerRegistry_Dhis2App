import { Button, InputField,Table, TableHead, TableCellHead, TableRowHead } from "@dhis2/ui";

import { useDataQuery } from '@dhis2/app-runtime'
import React, { useState, useEffect }  from "react";
import styles from '../Form.module.css'
import i18n from '../../locales/index.js'


// Nyamata: R0kfMYExrnk
// Butaro: OujzhM1lgN5

const orgUnitsQuery = {
    results: {
        resource: 'organisationUnits',
        id: ({ orgUnitID }) => orgUnitID,
        params:{
            fields: ['children[name,id]']
        },
    },
}

export const TumourTableViewHeader = ({onUpdateFetchInfo, provinces}) => {
  const { loading, error, data, refetch } = useDataQuery(orgUnitsQuery, {
    variables: { orgUnitID: 'Hjw70Lodtf2' },
    lazy: true,
  })

  
  // Component's states
  // const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [subdistricts, setSubdistricts] = useState([])
  const [sectors, setSectors] = useState([])
  const [facilities, setFacilities] = useState([])
  const [orgUnitID, setOrgUnitID] = useState([])
  
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  // useEffect(() =>{
  //   refetch()
  // }, [])

  const updateFilterInfo = () => {
    onUpdateFetchInfo(startDate, endDate, orgUnitID)
  }
  
  const updateFacilityID = (ev) => {
    let orgUnitID = ev.target.value
    setOrgUnitID(orgUnitID)
  }

  const getDistricts = (ev) => {
    let orgUnitID = ev.target.value
    refetch({ orgUnitID: orgUnitID })
    if(data){
      setDistricts(data.results.children)
    }
  }

  const getSubDistricts = (ev) => {
    let orgUnitID = ev.target.value
    refetch({ orgUnitID: orgUnitID })
    {data && setSubdistricts(data.results.children)}
  }

  const getSectors = (ev) => {
    let orgUnitID = ev.target.value
    refetch({ orgUnitID: orgUnitID })
    {data && setSectors(data.results.children)}
  }

  const getFacilities = (ev) => {
    let orgUnitID = ev.target.value
    refetch({ orgUnitID: orgUnitID })
    {data && setFacilities(data.results.children)}
  }

  return (
    <div className='products'>
        <h1>{i18n.t('Tumour Data for Export')}</h1>
        <div style={{ border: '1px solid #c4c9cc', padding: 8, width: '40%' }} className={styles.row}>
            <div style={{ border: '1px solid #c4c9cc', padding: 8, width: '30%' }}>
              <InputField label="From" type="date" value={startDate} onChange={({ value }) => setStartDate(value)} />
            </div>
            <div style={{ border: '1px solid #c4c9cc', padding: 8, width: '30%' }}>
              <InputField label="To" type="date" value={endDate} onChange={({ value }) => setEndDate(value)} />
            </div>
        </div>

        <div style={{ width: '30%' }}>
          <Table >
            <TableHead>
                <TableRowHead>
                    <TableCellHead>
                      <div className={styles.row}>
                        {/* <p>{data.results.children}</p> */}
                          <select className={styles.cbx} onChange={getDistricts} name="provselected">
                              <option value="0">Select Province...</option>
                              {provinces && provinces.map( (orgUnit) => (
                                 <option key={orgUnit.id} value={orgUnit.id}> { orgUnit.name } </option>
                              ))}
                               
                          </select>
                      </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={getSubDistricts} name="provselected">
                                <option value="0">Select District...</option>
                                {districts && districts.map( (orgUnit) => (
                                 <option key={orgUnit.id} value={orgUnit.id}> { orgUnit.name } </option>
                              ))}
                            </select>
                        </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={getSectors} name="provselected">
                                <option value="0">Select Sub-District...</option>
                                {subdistricts && subdistricts.map( (orgUnit) => (
                                 <option key={orgUnit.id} value={orgUnit.id}> { orgUnit.name } </option>
                              ))}
                            </select>
                        </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={getFacilities} name="provselected">
                                <option value="0">Select Sector...</option>
                                {sectors && sectors.map( (orgUnit) => (
                                 <option key={orgUnit.id} value={orgUnit.id}> { orgUnit.name } </option>
                              ))}
                            </select>
                        </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={updateFacilityID} name="provselected">
                                <option value="0">Select Facility...</option>
                                {facilities && facilities.map( (orgUnit) => (
                                 <option key={orgUnit.id} value={orgUnit.id}> { orgUnit.name } </option>
                              ))}
                            </select>
                        </div>
                      </TableCellHead>
                    </TableRowHead>
                </TableHead>
            </Table>
         </div>         
         <Button primary onClick={updateFilterInfo}>Filter </Button>     
    </div>
  )
}

