/* eslint-disable prettier/prettier */
import {
  Button,
  ButtonStrip,
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";
import React from "react";
import { CSVLink } from "react-csv";
import styles from '../Form.module.css'
import { DeleteTumourEventBtn } from './DeleteTumourEventBtn'
import { NewTumourEventBtn } from "./NewTumourEventBtn";


const csv_props = {
  data: '',
  headers: '',
  filename: 'source.csv'
};


var RECS = "1", CHEC = "1", HIVSTATUS = "", DATEHIVTEST = "", AGE = "";
const tumourTableHeaders = "RECS"+"\t"+"CHEC"+"\t"+"HIVSTATUS"+"\t"+"DATEHIVTEST"+"\t"+"AGE";
var tumourTableData = tumourTableHeaders;

function exportTSVFile(events) {
  events.map((event) => {
    event.dataValues.map((dataValue) =>{
        if(dataValue.dataElement == "XBZsBO1iIMu") {
          HIVSTATUS = dataValue.value
        }
        if(dataValue.dataElement == "w3hjoxhRdxX") {
          DATEHIVTEST = dataValue.value
        }
        if(dataValue.dataElement == "Lklmhjoa2VZ") {
          AGE = dataValue.value
        }
        var tumourTableRow = RECS+"\t"+CHEC+"\t"+HIVSTATUS+"\t"+DATEHIVTEST+"\t"+AGE;
        tumourTableData = tumourTableData+ "\n" +tumourTableRow;
    });
  });

  const element = document.createElement("a");
  const file = new Blob([tumourTableData], {type: 'text/plain;charset=utf-8'});
  element.href = URL.createObjectURL(file);
  element.download = "tumour-table.txt";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();

}

export const TumourTableView = ({ events, refetch }) => (
  <div className='products'>
        <h1>Tumour Data for Export</h1>
        <div
            style={{
            border: '1px solid #c4c9cc',
            padding: 8,
            width: '100%'
        }}
        className={styles.row}>
             <Button primary onClick={() => {exportTSVFile(events)}}>Export Tumour Data </Button>
    </div>

  <Table>
    <TableHead>
      <TableRowHead>
        <TableCellHead>RECS</TableCellHead>
        <TableCellHead>CHEC</TableCellHead>
        <TableCellHead>HIVSTATUS</TableCellHead>
        <TableCellHead>DATEHIVTEST</TableCellHead>
        <TableCellHead>AGE</TableCellHead>
        <TableCellHead>ADDR</TableCellHead>
        <TableCellHead>SECTOR</TableCellHead>
        <TableCellHead>CELL</TableCellHead>
        <TableCellHead>VILLAGE</TableCellHead>
        <TableCellHead>MPCODE</TableCellHead>
        <TableCellHead>MPSEQ</TableCellHead>
        <TableCellHead>MPTOT</TableCellHead>
        <TableCellHead>INCID</TableCellHead> 
        <TableCellHead>BAS</TableCellHead>
        <TableCellHead>TOP</TableCellHead>
        <TableCellHead>BEH</TableCellHead>
        {/* <TableCellHead>LATERALITY</TableCellHead>
        <TableCellHead>MOR</TableCellHead>
        <TableCellHead>I10</TableCellHead>
        <TableCellHead>ICCC</TableCellHead>
        <TableCellHead>GRDE</TableCellHead>
        <TableCellHead>STAGE</TableCellHead>
        <TableCellHead>T</TableCellHead>
        <TableCellHead>N</TableCellHead>
        <TableCellHead>M</TableCellHead>
        <TableCellHead>UPDATE</TableCellHead>
        <TableCellHead>OBSOLETEFLAGTUMOURTABLE</TableCellHead>
        <TableCellHead>TUMOURID</TableCellHead>
        <TableCellHead>PATIENTIDTUMOURTABLE</TableCellHead>
        <TableCellHead>PATIENTRECORDIDTUMOURTABLE</TableCellHead>
        <TableCellHead>TUMOURUPDATEDBY</TableCellHead>
        <TableCellHead>TUMOURUNDUPLICATIONSTATUS</TableCellHead>
        <TableCellHead>INITIALT</TableCellHead>
        <TableCellHead>INTENTT</TableCellHead>
        <TableCellHead>SGRY</TableCellHead>
        <TableCellHead>DATES</TableCellHead>
        <TableCellHead>CHEMO</TableCellHead>
        <TableCellHead>STARTC</TableCellHead>
        <TableCellHead>ENDCHEMO</TableCellHead>
        <TableCellHead>IMMUNO</TableCellHead>
        <TableCellHead>STARTI</TableCellHead>
        <TableCellHead>ENDIMMUNO</TableCellHead>
        <TableCellHead>HPVASS</TableCellHead>
        <TableCellHead>RADIO</TableCellHead>
        <TableCellHead>STARTR</TableCellHead>
        <TableCellHead>ENDRADIO</TableCellHead>
        <TableCellHead>HORMO</TableCellHead>
        <TableCellHead>STARTH</TableCellHead>
        <TableCellHead>ENDHORMO</TableCellHead>
        <TableCellHead>PALLIA</TableCellHead>
        <TableCellHead>DATEP</TableCellHead>
        <TableCellHead>OTHERT</TableCellHead>
        <TableCellHead>SPECIFYOT</TableCellHead>
        <TableCellHead>STARTOT</TableCellHead>
        <TableCellHead>ENDOT</TableCellHead> */}
        <TableCellHead>
          <ButtonStrip end>
            <NewTumourEventBtn refetch={refetch} />
          </ButtonStrip>
        </TableCellHead>
      </TableRowHead>
    </TableHead>
    <TableBody>
      {events.map((evnt) => (
        <TableRow key={evnt.event}>
          <TableCell>1</TableCell>
          <TableCell>1</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="XBZsBO1iIMu"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="w3hjoxhRdxX"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="Lklmhjoa2VZ"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="Yiplgepu9rQ"?dataValue.value:"")}</TableCell>{/* Provice: Takes district from dhis2 */}
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="HnxmesFVHIl"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="JC6EUMrVCUN"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="WWsELkuJMbi"?dataValue.value:"")}</TableCell>
          <TableCell></TableCell> {/* Auto gen by can reg */}
          <TableCell>0</TableCell> {/* Auto gen by can reg */}
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="QsbsNHyRwcu"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="qiPi86HJH9D"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="b4nlCulDaNv"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="VahotmishoD"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="R3V4FZ7bm1Z"?dataValue.value:"")}</TableCell>
          {/* <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="pUcbnDZTKWO"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="g4InB94akRh"?dataValue.value:"")}</TableCell>
          <TableCell>Auto Gen.</TableCell> 
          <TableCell>Auto Gen.</TableCell> 
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="MiCTO3OgRB8"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="lsyoWxLKpcg"?dataValue.value:"")}</TableCell>
          <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="jufaPpTt33C"?dataValue.value:"")}</TableCell> 
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        */}
          <TableCell>
            <ButtonStrip end>
              <DeleteTumourEventBtn id={evnt.id} refetch={refetch} />
            </ButtonStrip>
          </TableCell>
        </TableRow>
        
      ))}
    </TableBody>
  </Table>
  </div>
);
