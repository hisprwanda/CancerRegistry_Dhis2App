import React from 'react'
import { Button, Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead,
  } from "@dhis2/ui";

import { CSVLink } from "react-csv";

import styles from './Form.module.css';


  const headers = [
    { label: "TUMOURIDSOURCETABLE", key: "TUMOURIDSOURCETABLE" },
    { label: "SOURCERECORDID", key: "SOURCERECORDID" },
    { label: "SRC", key: "SRC" },
    { label: "SRVC", key: "SRVC" },
    { label: "SRCNO", key: "SRCNO" },
    { label: "ARCHVC", key: "ARCHVC" },
    { label: "ADMNDATE", key: "ADMNDATE" },
    { label: "DATESC", key: "DATESC" },
    { label: "DISTDATE", key: "DISTDATE" },
    { label: "LABO", key: "LABO" },
    { label: "LABNO", key: "LABNO" },
    { label: "BIOPSYNO", key: "BIOPSYNO" },
    { label: "RECEPTNDATE", key: "RECEPTNDATE" },
    { label: "REPRTDATE", key: "REPRTDATE" },
    { label: "FROM", key: "FROM" },
    { label: "SRCDATE", key: "SRCDATE" },
    { label: "TO", key: "TO" },
    { label: "INTENTREF", key: "INTENTREF" },
    { label: "FILLEDBY", key: "FILLEDBY" },
  ];
  
  const sourceDataForExport = [
    {TUMOURIDSOURCETABLE:"200700280101", SOURCERECORDID: "200700000101", SRC: "0203", SRVC: "30", SRCNO: "17120", ARCHVC: "XN", ADMNDATE: "20140812", DATESC: "2015113", DISTDATE: "2015113", LABO: "NRL", LABNO: "0034", BIOPSYNO: "HP945/15", RECEPTNDATE: "20150827", REPRTDATE: "20140812", FROM: "67", SRCDATE: "20151202", TO: "98", INTENTREF: "HT", FILLEDBY: "07" },
    {TUMOURIDSOURCETABLE:"200745280124", SOURCERECORDID: "234234234234", SRC: "0043", SRVC: "34", SRCNO: "45233", ARCHVC: "HD", ADMNDATE: "20140812", DATESC: "2015113", DISTDATE: "2015113", LABO: "YIW", LABNO: "0034", BIOPSYNO: "HP945/15", RECEPTNDATE: "20150827", REPRTDATE: "20140812", FROM: "82", SRCDATE: "20151202", TO: "98", INTENTREF: "UI", FILLEDBY: "78" },
    {TUMOURIDSOURCETABLE:"200700280153", SOURCERECORDID: "234343555555", SRC: "0004", SRVC: "30", SRCNO: "23452", ARCHVC: "DS", ADMNDATE: "20140812", DATESC: "2015113", DISTDATE: "2015113", LABO: "NRL", LABNO: "0034", BIOPSYNO: "HP945/15", RECEPTNDATE: "20150827", REPRTDATE: "20140812", FROM: "67", SRCDATE: "20151202", TO: "22", INTENTREF: "HT", FILLEDBY: "07" },
    {TUMOURIDSOURCETABLE:"200700280123", SOURCERECORDID: "867878767888", SRC: "0006", SRVC: "23", SRCNO: "76432", ARCHVC: "YE", ADMNDATE: "20140812", DATESC: "2015113", DISTDATE: "2015113", LABO: "NRL", LABNO: "0034", BIOPSYNO: "HP945/15", RECEPTNDATE: "20150827", REPRTDATE: "20140812", FROM: "34", SRCDATE: "20151202", TO: "75", INTENTREF: "HT", FILLEDBY: "07" },
    {TUMOURIDSOURCETABLE:"200700235555", SOURCERECORDID: "012222222344", SRC: "0002", SRVC: "30", SRCNO: "17120", ARCHVC: "UE", ADMNDATE: "20140812", DATESC: "2015113", DISTDATE: "2015113", LABO: "HDK", LABNO: "0034", BIOPSYNO: "HP945/15", RECEPTNDATE: "20150827", REPRTDATE: "20140812", FROM: "76", SRCDATE: "20151202", TO: "76", INTENTREF: "MJ", FILLEDBY: "86" },
    {TUMOURIDSOURCETABLE:"435354345434", SOURCERECORDID: "754563424352", SRC: "0007", SRVC: "76", SRCNO: "17120", ARCHVC: "AS", ADMNDATE: "20140812", DATESC: "2015113", DISTDATE: "2015113", LABO: "NRL", LABNO: "0034", BIOPSYNO: "HP945/15", RECEPTNDATE: "20150827", REPRTDATE: "20140812", FROM: "67", SRCDATE: "20151202", TO: "82", INTENTREF: "HT", FILLEDBY: "07" },
    {TUMOURIDSOURCETABLE:"785743454354", SOURCERECORDID: "754623634342", SRC: "0008", SRVC: "30", SRCNO: "87654", ARCHVC: "JD", ADMNDATE: "20140812", DATESC: "2015113", DISTDATE: "2015113", LABO: "OID", LABNO: "0034", BIOPSYNO: "HP945/15", RECEPTNDATE: "20150827", REPRTDATE: "20140812", FROM: "22", SRCDATE: "20151202", TO: "98", INTENTREF: "HT", FILLEDBY: "07" },
    {TUMOURIDSOURCETABLE:"132143244344", SOURCERECORDID: "735615237872", SRC: "0009", SRVC: "98", SRCNO: "17120", ARCHVC: "IU", ADMNDATE: "20140812", DATESC: "2015113", DISTDATE: "2015113", LABO: "NRL", LABNO: "0034", BIOPSYNO: "HP945/15", RECEPTNDATE: "20150827", REPRTDATE: "20140812", FROM: "23", SRCDATE: "20151202", TO: "98", INTENTREF: "HT", FILLEDBY: "07" }
    ];

    const csv_props = {
      data: sourceDataForExport,
      headers: headers,
      filename: 'source.csv'
    };
     
    export const Source = () => (


    <div className='products'>
        <h1>Source  Data for Export</h1>
        
        <div
            style={{
            border: '1px solid #c4c9cc',
            padding: 8,
            width: '100%'
        }}
         className={styles.row}>
               
          <CSVLink {...csv_props}>
              <Button primary type="submit">Export Source Data </Button>
          </CSVLink>
      </div>

        <Table>
            <TableHead>
              <TableRowHead>
                <TableCellHead>TUMOUR ID SOURCE TABLE</TableCellHead>
                <TableCellHead>SOURCE RECORD ID</TableCellHead>
                <TableCellHead>SRC</TableCellHead>
                <TableCellHead>SRVC</TableCellHead>
                <TableCellHead>SRC NO</TableCellHead>
                <TableCellHead>ARCHVC</TableCellHead>
                <TableCellHead>ADMN DATE</TableCellHead>
                <TableCellHead>DATE SC</TableCellHead>
                <TableCellHead>DIST DATE</TableCellHead>
                <TableCellHead>LABO</TableCellHead>
                <TableCellHead>LAB NO</TableCellHead>
                <TableCellHead>BIOPSY NO</TableCellHead>
                <TableCellHead>RECEPTN DATE</TableCellHead>
                <TableCellHead>REPRT DATE</TableCellHead>
                <TableCellHead>FROM</TableCellHead>
                <TableCellHead>SRC DATE</TableCellHead>
                <TableCellHead>TO</TableCellHead>
                <TableCellHead>INTENT REF</TableCellHead>
                <TableCellHead>FILLED BY</TableCellHead>
              </TableRowHead>
            </TableHead>
            <TableBody>
            {sourceDataForExport.map((item => 
                  <TableRow key={item.firstName} >
                    <TableCell>{item.TUMOURIDSOURCETABLE}</TableCell>
                    <TableCell>{item.SOURCERECORDID}</TableCell>
                    <TableCell>{item.SRC}</TableCell>
                    <TableCell>{item.SRVC}</TableCell>
                    <TableCell>{item.SRCNO}</TableCell>
                    <TableCell>{item.ARCHVC}</TableCell>
                    <TableCell>{item.ADMNDATE}</TableCell>
                    <TableCell>{item.DATESC}</TableCell>
                    <TableCell>{item.DISTDATE}</TableCell>
                    <TableCell>{item.LABO}</TableCell>
                    <TableCell>{item.LABNO}</TableCell>
                    <TableCell>{item.BIOPSYNO}</TableCell>
                    <TableCell>{item.RECEPTNDATE}</TableCell>
                    <TableCell>{item.REPRTDATE}</TableCell>
                    <TableCell>{item.FROM}</TableCell>
                    <TableCell>{item.SRCDATE}</TableCell>
                    <TableCell>{item.TO}</TableCell>
                    <TableCell>{item.INTENTREF}</TableCell>
                    <TableCell>{item.FILLEDBY}</TableCell>
                  </TableRow>
 ))}
                  
            </TableBody>
          </Table>
    </div>
)
