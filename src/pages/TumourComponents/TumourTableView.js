/* eslint-disable prettier/prettier */
import { Button, ButtonStrip, Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead,
InputField, OrganisationUnitTree} from "@dhis2/ui";
import React, { useState }  from "react";
import { CSVLink } from "react-csv";
import styles from '../Form.module.css'
import { DeleteTumourEventBtn } from './DeleteTumourEventBtn'
import { NewTumourEventBtn } from "./NewTumourEventBtn";



export const TumourTableView = ({ events, refetch }) => {

  const csv_props = { data: '', headers: '', filename: 'source.csv' };
  
  var RECS = "1", CHEC = "1", HIVSTATUS = "", DATEHIVTEST = "", AGE = "",ADDR= "",MPSEQ= "0",MPTOT= "",INCID= "",BAS= "",TOP= "",BEH= "",
  LATERALITY="",MOR="",I10="",ICCC="",GRDE="",STAGE="",T="",N="",M="",UPDATE="20210605",OBSOLETEFLAGTUMOURTABLE="0",TUMOURID= "",PATIENTIDTUMOURTABLE= "",PATIENTRECORDIDTUMOURTABLE="",
  TUMOURUPDATEDBY="",TUMOURUNDUPLICATIONSTATUS="",INITIALT="",INTENTT="",SGRY="",DATES="",CHEMO="",STARTC="",ENDCHEMO="",IMMUNO="",STARTI="",ENDIMMUNO="",HPVASS="",RADIO="",
  STARTR="",ENDRADIO="",HORMO="",STARTH="",ENDHORMO="",PALLIA="",DATEP="",OTHERT="",SPECIFYOT="",STARTOT="",ENDOT="";
  
  const tumourTableHeaders = "RECS"+"\t"+"CHEC"+"\t"+"HIVSTATUS"+"\t"+"DATEHIVTEST"+"\t"+"AGE"+"\t"+"ADDR"+"\t"+"MPSEQ"+"\t"+"MPTOT"+"\t"+"INCID"+"\t"+"BAS"+"\t"+"TOP"+"\t"+"BEH"+"\t"+
  "LATERALITY"+"\t"+"MOR"+"\t"+"I10"+"\t"+"ICCC"+"\t"+"GRDE"+"\t"+"STAGE"+"\t"+"T"+"\t"+"N"+"\t"+"M"+"\t"+"UPDATE"+"\t"+"OBSOLETEFLAGTUMOURTABLE"+"\t"+"TUMOURID"+"\t"+"PATIENTIDTUMOURTABLE"+"\t"+"PATIENTRECORDIDTUMOURTABLE"+"\t"+
  "TUMOURUPDATEDBY"+"\t"+"TUMOURUNDUPLICATIONSTATUS"+"\t"+"INITIALT"+"\t"+"INTENTT"+"\t"+"SGRY"+"\t"+"DATES"+"\t"+"CHEMO"+"\t"+"STARTC"+"\t"+"ENDCHEMO"+"\t"+"IMMUNO"+"\t"+"STARTI"+"\t"+"ENDIMMUNO"+"\t"+"HPVASS"+"\t"+"RADIO"+"\t"+
  "STARTR"+"\t"+"ENDRADIO"+"\t"+"HORMO"+"\t"+"STARTH"+"\t"+"ENDHORMO"+"\t"+"PALLIA"+"\t"+"DATEP"+"\t"+"OTHERT"+"\t"+"SPECIFYOT"+"\t"+"STARTOT"+"\t"+"ENDOT";
  ;
  var tumourTableData = tumourTableHeaders;
  
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const formatPatientID = (oldID) => {
    var newID
    if (oldID.length == 11) {
      newID = oldID.substring(0, 4) + oldID.substring(5, 9);
    } else if  (oldID.length > 11){
      newID = oldID.substring(10);
    }
    return newID;
  }

  const exportTSVFile = (events) =>{
    console.log("Events length: ",events.length);
    events.map((event) => {
      event.dataValues.map((dataValue) =>{
          if(dataValue.dataElement == "XBZsBO1iIMu") { HIVSTATUS = dataValue.value }
          if(dataValue.dataElement == "w3hjoxhRdxX") { DATEHIVTEST = dataValue.value }
          if(dataValue.dataElement == "Lklmhjoa2VZ") { AGE = dataValue.value }
          if(dataValue.dataElement == "Yiplgepu9rQ") { ADDR = dataValue.value }
          if(dataValue.dataElement == "QsbsNHyRwcu") { MPTOT = dataValue.value }
          if(dataValue.dataElement == "qiPi86HJH9D") { INCID = dataValue.value }
          if(dataValue.dataElement == "b4nlCulDaNv") { BAS = dataValue.value }
          if(dataValue.dataElement == "VahotmishoD") { TOP = dataValue.value }
          if(dataValue.dataElement == "R3V4FZ7bm1Z") { BEH = dataValue.value }
          if(dataValue.dataElement == "pUcbnDZTKWO") { LATERALITY = dataValue.value }
          if(dataValue.dataElement == "g4InB94akRh") { MOR = dataValue.value }
          if(dataValue.dataElement == "MiCTO3OgRB8") { GRDE = dataValue.value }
          if(dataValue.dataElement == "lsyoWxLKpcg") { STAGE = dataValue.value }
          if(dataValue.dataElement == "jufaPpTt33C") { T = dataValue.value }
          if(dataValue.dataElement == "crCh4AWyhEQ") { N = dataValue.value }
          if(dataValue.dataElement == "YU85aZgUvpI") { M = dataValue.value }
          
          if(dataValue.dataElement == "U6uTS5AuKQi") {
            var coreID = formatPatientID(dataValue.value);
            TUMOURID = coreID + "0101";
            PATIENTIDTUMOURTABLE = coreID;
            PATIENTRECORDIDTUMOURTABLE = coreID +"01";
            console.log("CoreId: ", coreID);
          }

          TUMOURUPDATEDBY = event.completedBy;
          if(dataValue.dataElement == "QDYFCDo0kLm") { INITIALT = dataValue.value }
          if(dataValue.dataElement == "EJi6tdw5T1v") { INTENTT = dataValue.value }
          if(dataValue.dataElement == "lb1iN94cSNn") { SGRY = dataValue.value }
          if(dataValue.dataElement == "NzUoPBTcUme") { DATES = dataValue.value }
          if(dataValue.dataElement == "tmy8Js2OerA") { CHEMO = dataValue.value }
          if(dataValue.dataElement == "dqLzVzpPBQk") { STARTC = dataValue.value }
          if(dataValue.dataElement == "qKApg9EbBvP") { ENDCHEMO = dataValue.value }
          if(dataValue.dataElement == "qhTmdhweTY6") { IMMUNO = dataValue.value }
          if(dataValue.dataElement == "UH0QjAVVpBw") { STARTI = dataValue.value }
          if(dataValue.dataElement == "Os8vbHJ3qoc") { ENDIMMUNO = dataValue.value }
          if(dataValue.dataElement == "simuoODFRUc") { RADIO = dataValue.value }
          if(dataValue.dataElement == "KuewOYQYRq7") { STARTR = dataValue.value }
          if(dataValue.dataElement == "THtdWv46cXH") { ENDRADIO = dataValue.value }
          if(dataValue.dataElement == "QKXwZ57aGdH") { HORMO = dataValue.value }
          if(dataValue.dataElement == "pazmxkluuAK") { STARTH = dataValue.value }
          if(dataValue.dataElement == "ZTtTjPPKemm") { ENDHORMO = dataValue.value }
          if(dataValue.dataElement == "N6J5Bp9auN9") { PALLIA = dataValue.value }
          if(dataValue.dataElement == "KWsp9YpTp8O") { DATEP = dataValue.value }
          if(dataValue.dataElement == "YYW855k5GgW") { OTHERT = dataValue.value }
          if(dataValue.dataElement == "tfeZgkgqJC9") { SPECIFYOT = dataValue.value }


          var tumourTableRow = RECS+"\t"+CHEC+"\t"+HIVSTATUS+"\t"+DATEHIVTEST+"\t"+AGE+"\t"+ADDR+"\t"+MPSEQ+"\t"+MPTOT+"\t"+INCID+"\t"+BAS+"\t"+TOP+"\t"+BEH+"\t"+
          LATERALITY+"\t"+MOR+"\t"+I10+"\t"+ICCC+"\t"+GRDE+"\t"+STAGE+"\t"+T+"\t"+N+"\t"+M+"\t"+UPDATE+"\t"+OBSOLETEFLAGTUMOURTABLE+"\t"+TUMOURID+"\t"+PATIENTIDTUMOURTABLE+"\t"+PATIENTRECORDIDTUMOURTABLE+"\t"+
          TUMOURUPDATEDBY+"\t"+TUMOURUNDUPLICATIONSTATUS+"\t"+INITIALT+"\t"+INTENTT+"\t"+SGRY+"\t"+DATES+"\t"+CHEMO+"\t"+STARTC+"\t"+ENDCHEMO+"\t"+IMMUNO+"\t"+STARTI+"\t"+ENDIMMUNO+"\t"+HPVASS+"\t"+RADIO+"\t"+
          STARTR+"\t"+ENDRADIO+"\t"+HORMO+"\t"+STARTH+"\t"+ENDHORMO+"\t"+PALLIA+"\t"+DATEP+"\t"+OTHERT+"\t"+SPECIFYOT+"\t"+STARTOT+"\t"+ENDOT;
          
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

  const onChange = (ev) =>{
    console.log("Selected Orgunit", ev.path);
  }

  
  return (
    <div className='products'>
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
              <InputField 
              label="To" 
              type="date" 
              value={dateTo} 
              onChange={({ value }) => setDateTo(value)} />
            </div>
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
          <TableCellHead>LATERALITY</TableCellHead>
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
          <TableCellHead>ENDOT</TableCellHead>
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
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="Yiplgepu9rQ"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="HnxmesFVHIl"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="JC6EUMrVCUN"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="WWsELkuJMbi"?dataValue.value:"")}</TableCell>
            <TableCell></TableCell>
            <TableCell>0</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="QsbsNHyRwcu"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="qiPi86HJH9D"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="b4nlCulDaNv"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="VahotmishoD"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="R3V4FZ7bm1Z"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="pUcbnDZTKWO"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="g4InB94akRh"?dataValue.value:"")}</TableCell>
            <TableCell>Auto Gen.</TableCell> 
            <TableCell>Auto Gen.</TableCell> 
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="MiCTO3OgRB8"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="lsyoWxLKpcg"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="jufaPpTt33C"?dataValue.value:"")}</TableCell> 
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>20210605</TableCell>
            <TableCell>0</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="U6uTS5AuKQi"?formatPatientID(dataValue.value):"")}0101</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="U6uTS5AuKQi"?formatPatientID(dataValue.value):"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="U6uTS5AuKQi"?formatPatientID(dataValue.value):"")}01</TableCell>
            <TableCell>{evnt.completedBy}</TableCell>
            <TableCell>0</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="QDYFCDo0kLm"?dataValue.value:"")}</TableCell> 
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="EJi6tdw5T1v"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="lb1iN94cSNn"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="NzUoPBTcUme"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="tmy8Js2OerA"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="dqLzVzpPBQk"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="qKApg9EbBvP"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="qhTmdhweTY6"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="UH0QjAVVpBw"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="Os8vbHJ3qoc"?dataValue.value:"")}</TableCell>
            <TableCell></TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="simuoODFRUc"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="KuewOYQYRq7"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="THtdWv46cXH"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="QKXwZ57aGdH"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="pazmxkluuAK"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="ZTtTjPPKemm"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="N6J5Bp9auN9"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="KWsp9YpTp8O"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="YYW855k5GgW"?dataValue.value:"")}</TableCell>
            <TableCell>{evnt.dataValues.map(dataValue => dataValue.dataElement=="tfeZgkgqJC9"?dataValue.value:"")}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
         
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
  )
 };
