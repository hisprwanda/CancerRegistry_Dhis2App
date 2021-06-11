import { Button, CircularLoader, InputField,Table, TableHead, TableCellHead, TableRowHead } from "@dhis2/ui";
import { useDataQuery, useAlert } from '@dhis2/app-runtime'
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
  
  // Component's states
  const [orgUnitLevel, setOrgUnitLevel] = useState('')
  const [districts, setDistricts] = useState([])
  const [subdistricts, setSubdistricts] = useState([])
  const [sectors, setSectors] = useState([])
  const [facilities, setFacilities] = useState([])
  const [orgUnitID, setOrgUnitID] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  // A dynamic useDataQuery to fetch organization units
  const { data, refetch } = useDataQuery(orgUnitsQuery, {
    variables: { orgUnitID: 'Hjw70Lodtf2' },
    lazy: true,
  })

  // A dynamic alert to communicate success or failure 
    const { show } = useAlert(
        ({ message }) => message,
        ({ status }) => {
            if (status === 'success') return { success: true }
            else if (status === 'error') return { critical: true }
            else return {}
        }
    )
  
  const updateFilterInfo = () => {
    onUpdateFetchInfo(startDate, endDate, orgUnitID)
  }
  
  const updateOrgUnitLevel = (data) => {      
      switch (orgUnitLevel) {
        case 'Level-District':
          setDistricts(data.results.children)
          break;
          case 'Level-SubDist':
            setSubdistricts(data.results.children)
            break;
          case 'Level-Sector':
            setSectors(data.results.children)
            break;
          case 'Level-Facility':
            setFacilities(data.results.children)
            break;    
        default:
          console.log("Got nothing...");
          break;
    }
  }

  // Updates the org unit levels when the query finishes fetching data.
  useEffect(() => {
    if (data) {
      updateOrgUnitLevel(data)
    }
  }, [data])
  
  
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
                          <select className={styles.cbx} onChange={ (ev) => {
                            setOrgUnitLevel('Level-District' )
                            refetch({ orgUnitID: ev.target.value})
                          }} name="provselected">
                              <option value="0">Select Province...</option>
                              {provinces && provinces.map( (orgUnit) => (
                                 <option key={orgUnit.id} value={orgUnit.id}> { orgUnit.name } </option>
                              ))}
                          </select>
                      </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={(ev) => {
                            setOrgUnitLevel('Level-SubDist')
                            refetch({ orgUnitID: ev.target.value})
                          }} name="provselected">
                                <option value="0">Select District...</option>
                                {districts && districts.map( (orgUnit) => (
                                 <option key={orgUnit.id} value={orgUnit.id}> { orgUnit.name } </option>
                              ))}
                            </select>
                        </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={(ev) => {
                            setOrgUnitLevel('Level-Sector' )
                            refetch({ orgUnitID: ev.target.value})
                          }} name="provselected">
                                <option value="0">Select Sub-District...</option>
                                {subdistricts && subdistricts.map( (orgUnit) => (
                                 <option key={orgUnit.id} value={orgUnit.id}> { orgUnit.name } </option>
                              ))}
                            </select>
                        </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={(ev) => {
                            setOrgUnitLevel('Level-Facility' )
                            refetch({ orgUnitID: ev.target.value})
                          }} name="provselected">
                                <option value="0">Select Sector...</option>
                                {sectors && sectors.map( (orgUnit) => (
                                 <option key={orgUnit.id} value={orgUnit.id}> { orgUnit.name } </option>
                              ))}
                            </select>
                        </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={(ev) => setOrgUnitID(ev.target.value)} name="provselected">
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

