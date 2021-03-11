import React from 'react'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
  TableFoot 
  } from "@dhis2/ui";

  import styles from './Form.module.css'



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
         
          <Button primary type="submit" end>
              Export Source Data
          </Button>
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
                  <TableRow >
                    <TableCell>200700280101</TableCell>
                    <TableCell>200700000101</TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>17120</TableCell>
                    <TableCell>XN</TableCell>
                    <TableCell></TableCell>
                    <TableCell>2015113</TableCell>
                    <TableCell></TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell></TableCell>
                    <TableCell>HP945/15</TableCell>
                    <TableCell>20150827</TableCell>
                    <TableCell>20140812</TableCell>
                    <TableCell></TableCell>
                    <TableCell>20151202</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>04</TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell>200700280101</TableCell>
                    <TableCell>200700000101</TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>17120</TableCell>
                    <TableCell>XN</TableCell>
                    <TableCell></TableCell>
                    <TableCell>2015113</TableCell>
                    <TableCell></TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell></TableCell>
                    <TableCell>HP945/15</TableCell>
                    <TableCell>20150827</TableCell>
                    <TableCell>20140812</TableCell>
                    <TableCell></TableCell>
                    <TableCell>20151202</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>04</TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell>200700280101</TableCell>
                    <TableCell>200700000101</TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>17120</TableCell>
                    <TableCell>XN</TableCell>
                    <TableCell></TableCell>
                    <TableCell>2015113</TableCell>
                    <TableCell></TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell></TableCell>
                    <TableCell>HP945/15</TableCell>
                    <TableCell>20150827</TableCell>
                    <TableCell>20140812</TableCell>
                    <TableCell></TableCell>
                    <TableCell>20151202</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>04</TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell>200700280101</TableCell>
                    <TableCell>200700000101</TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>17120</TableCell>
                    <TableCell>XN</TableCell>
                    <TableCell></TableCell>
                    <TableCell>2015113</TableCell>
                    <TableCell></TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell></TableCell>
                    <TableCell>HP945/15</TableCell>
                    <TableCell>20150827</TableCell>
                    <TableCell>20140812</TableCell>
                    <TableCell></TableCell>
                    <TableCell>20151202</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>04</TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell>200700280101</TableCell>
                    <TableCell>200700000101</TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>17120</TableCell>
                    <TableCell>XN</TableCell>
                    <TableCell></TableCell>
                    <TableCell>2015113</TableCell>
                    <TableCell></TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell></TableCell>
                    <TableCell>HP945/15</TableCell>
                    <TableCell>20150827</TableCell>
                    <TableCell>20140812</TableCell>
                    <TableCell></TableCell>
                    <TableCell>20151202</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>04</TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell>200700280101</TableCell>
                    <TableCell>200700000101</TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>17120</TableCell>
                    <TableCell>XN</TableCell>
                    <TableCell></TableCell>
                    <TableCell>2015113</TableCell>
                    <TableCell></TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell></TableCell>
                    <TableCell>HP945/15</TableCell>
                    <TableCell>20150827</TableCell>
                    <TableCell>20140812</TableCell>
                    <TableCell></TableCell>
                    <TableCell>20151202</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>04</TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell>200700280101</TableCell>
                    <TableCell>200700000101</TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>17120</TableCell>
                    <TableCell>XN</TableCell>
                    <TableCell></TableCell>
                    <TableCell>2015113</TableCell>
                    <TableCell></TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell></TableCell>
                    <TableCell>HP945/15</TableCell>
                    <TableCell>20150827</TableCell>
                    <TableCell>20140812</TableCell>
                    <TableCell></TableCell>
                    <TableCell>20151202</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>04</TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell>200700280101</TableCell>
                    <TableCell>200700000101</TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>17120</TableCell>
                    <TableCell>XN</TableCell>
                    <TableCell></TableCell>
                    <TableCell>2015113</TableCell>
                    <TableCell></TableCell>
                    <TableCell>0003</TableCell>
                    <TableCell></TableCell>
                    <TableCell>HP945/15</TableCell>
                    <TableCell>20150827</TableCell>
                    <TableCell>20140812</TableCell>
                    <TableCell></TableCell>
                    <TableCell>20151202</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>04</TableCell>
                  </TableRow>

                  
            </TableBody>
          </Table>
    </div>
)
