import { Button, InputField,Table, TableHead, TableCellHead, TableRowHead } from "@dhis2/ui";

import { useDataQuery } from '@dhis2/app-runtime'
import React, { useState }  from "react";
import styles from '../Form.module.css'

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

export const TumourTableViewHeader = () => {
  const { loading, error, data, refetch } = useDataQuery(orgUnitsQuery, {
    variables: { orgUnitID: 'Hjw70Lodtf2' },
})

 
  // Component's states
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [subdistrict, setSubdistrict] = useState([])
  const [sectors, setSectors] = useState([])
  const [facilities, setFacilities] = useState([])

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const getChildrenOrgUnits = (parentOrgUnitID) => {
    var chilrenOrgUnits = []
      return chilrenOrgUnits
  }


  const getProvinces = (orgUnitID) => {
    console.log("Passed org unit: " +orgUnitID)
    // refetch({ orgUnitID: orgUnitID })
  }

  const getDistricts = (provinceID) => {
    
    return "chilrenOrgUnits"
  }

  return (
    <div className='products'>
        <h1>Tumour Data for Export</h1>

        <div style={{ border: '1px solid #c4c9cc', padding: 8, width: '40%' }} className={styles.row}>
            <div style={{ border: '1px solid #c4c9cc', padding: 8, width: '30%' }}>
              <InputField label="From" type="date" value={startDate} onChange={({ value }) => setStartDate(value)} />
            </div>
            <div style={{ border: '1px solid #c4c9cc', padding: 8, width: '30%' }}>
              <InputField 
              label="To" 
              type="date" 
              value={endDate} 
              onChange={({ value }) => setEndDate(value)} />
            </div>
        </div>
        
        <div style={{ width: '30%' }}>
          <Table >
            <TableHead>
                <TableRowHead>
                    <TableCellHead>
                      <div className={styles.row}>
                          <select className={styles.cbx} onChange={getProvinces} name="provselected">
                              <option value="0">Select Province...</option>
                              <option>Kigali city</option>
                              <option>North</option>
                              <option>South</option>
                              <option>West</option>
                              <option>East</option>
                          </select>
                      </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={getProvinces} name="provselected">
                                <option value="0">Select District...</option>
                                <option>Burera</option>
                                <option>Musanze</option>
                                <option>Gicumbi</option>
                            </select>
                        </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={getProvinces} name="provselected">
                                <option value="0">Select Sub-District...</option>
                                <option>Butaro Sub-District</option>
                            </select>
                        </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={getProvinces} name="provselected">
                                <option value="0">Select Sector...</option>
                                <option>Ruhunde </option>
                                <option>Butaro </option>
                                <option>Gatebe </option>
                            </select>
                        </div>
                      </TableCellHead>
                      <TableCellHead>
                        <div className={styles.row}>
                            <select className={styles.cbx} onChange={getProvinces} name="provselected">
                                <option value="0">Select Facility...</option>
                                <option>Butaro DH </option>
                                <option>Butaro CS</option>
                                <option>Butaro MU </option>
                            </select>
                        </div>
                      </TableCellHead>
                    </TableRowHead>
                </TableHead>
            </Table>
         </div>         
          
        
    </div>
  )
}

