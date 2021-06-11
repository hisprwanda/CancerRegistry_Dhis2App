import { useDataQuery } from '@dhis2/app-runtime'
import { Button, CircularLoader, InputField, Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from "@dhis2/ui";

import { DataFilterHeaderView } from './DataFilterHeaderView'
import React, { useState } from 'react'

import { PaginationControls } from './TumourComponents/PaginationControls'
import * as classes from '../App.module.css'
import i18n from "../locales/index.js";
import styles from './Form.module.css'


const eventsQuery = {
    results: {
        resource: 'trackedEntityInstances.json',
        params: ({ page, startDate, endDate, orgUnitID }) => ({
            page: page,
            ou: orgUnitID,
            program: 'rx6V962E4XM',
            fields: ['attributes[attribute,value],enrollments[events[storedBy,event,programStage,dataValues[dataElement,value]]]'],
            programStartDate:startDate,
            programEndDate:endDate,
            totalPages: true,
            pageSize:5,
        }),
    },
    provinces: {
        resource: 'organisationUnits',
        id: 'Hjw70Lodtf2',
        params:{
            fields: ['children[name,id]']
        },
    },
}

export const Patient = () => {
    const { loading, error, data, refetch } = useDataQuery(eventsQuery, {
        variables: { page: 0, startDate: '2021-02-01', endDate: '2021-06-01', orgUnitID: 'OujzhM1lgN5' },
    })

    if (error) { return <span>ERROR: {error.message}</span> }

    if (loading) {
        return (
            <>
                <DataFilterHeaderView/>
                <CircularLoader />
            </>
        )
    }

    var RECS = "1", CHEC = "1", HIVSTATUS = "", DATEHIVTEST = "", AGE = "",ADDR= "",MPSEQ= "0",MPTOT= "",INCID= "",BAS= "",TOP= "",BEH= "",
    LATERALITY="",MOR="",I10="",ICCC="",GRDE="",STAGE="",T="",N="",M="",UPDATE="20210605",OBSOLETEFLAGTUMOURTABLE="0",TUMOURID= "",PATIENTIDTUMOURTABLE= "",PATIENTRECORDIDTUMOURTABLE="",TUMOURUPDATEDBY="",TUMOURUNDUPLICATIONSTATUS="",INITIALT="",INTENTT="",SGRY="",DATES="",CHEMO="",STARTC="",ENDCHEMO="",IMMUNO="",STARTI="",ENDIMMUNO="",HPVASS="",RADIO="",STARTR="",ENDRADIO="",HORMO="",STARTH="",ENDHORMO="",PALLIA="",DATEP="",OTHERT="",SPECIFYOT="",STARTOT="",ENDOT="";

    const tumourTableHeaders = "RECS"+"\t"+"CHEC"+"\t"+"HIVSTATUS"+"\t"+"DATEHIVTEST"+"\t"+"AGE"+"\t"+"ADDR"+"\t"+"MPSEQ"+"\t"+"MPTOT"+"\t"+"INCID"+"\t"+"BAS"+"\t"+"TOP"+"\t"+"BEH"+"\t"+
            "LATERALITY"+"\t"+"MOR"+"\t"+"I10"+"\t"+"ICCC"+"\t"+"GRDE"+"\t"+"STAGE"+"\t"+"T"+"\t"+"N"+"\t"+"M"+"\t"+"UPDATE"+"\t"+"OBSOLETEFLAGTUMOURTABLE"+"\t"+"TUMOURID"+"\t"+"PATIENTIDTUMOURTABLE"+"\t"+"PATIENTRECORDIDTUMOURTABLE"+"\t"+"TUMOURUPDATEDBY"+"\t"+"TUMOURUNDUPLICATIONSTATUS"+"\t"+"INITIALT"+"\t"+"INTENTT"+"\t"+"SGRY"+"\t"+"DATES"+"\t"+"CHEMO"+"\t"+"STARTC"+"\t"+"ENDCHEMO"+"\t"+"IMMUNO"+"\t"+"STARTI"+"\t"+"ENDIMMUNO"+"\t"+"HPVASS"+"\t"+"RADIO"+"\t"+"STARTR"+"\t"+"ENDRADIO"+"\t"+"HORMO"+"\t"+"STARTH"+"\t"+"ENDHORMO"+"\t"+"PALLIA"+"\t"+"DATEP"+"\t"+"OTHERT"+"\t"+"SPECIFYOT"+"\t"+"STARTOT"+"\t"+"ENDOT";
    var tumourTableData = tumourTableHeaders;

    const formatPatientID = (oldID) => {
        var newID
        if (oldID.length == 11) { 
            newID = oldID.substring(1, 9);
        } else if  (oldID.length > 11){ newID = oldID.substring(10); }
        return newID;
    }


    const exportTSVFile = (trackedEntityInstances) =>{

        /*
    
        trackedEntityInstances.map((tei) => {
            tei.enrollments.map((enrollment) => {
            enrollment.events.map((teiEvent) => {
                if(teiEvent.programStage=="Y0cWLBEdXzb"){
                teiEvent.dataValues.map((dataValue) =>{
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
                    }
                    TUMOURUPDATEDBY = teiEvent.storedBy?teiEvent.storedBy:"";
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

                });
                var tumourTableRow = RECS+"\t"+CHEC+"\t"+HIVSTATUS+"\t"+DATEHIVTEST+"\t"+AGE+"\t"+ADDR+"\t"+MPSEQ+"\t"+MPTOT+"\t"+INCID+"\t"+BAS+"\t"+TOP+"\t"+BEH+"\t"+
                        LATERALITY+"\t"+MOR+"\t"+I10+"\t"+ICCC+"\t"+GRDE+"\t"+STAGE+"\t"+T+"\t"+N+"\t"+M+"\t"+UPDATE+"\t"+OBSOLETEFLAGTUMOURTABLE+"\t"+TUMOURID+"\t"+PATIENTIDTUMOURTABLE+"\t"+PATIENTRECORDIDTUMOURTABLE+"\t"+
                        TUMOURUPDATEDBY+"\t"+TUMOURUNDUPLICATIONSTATUS+"\t"+INITIALT+"\t"+INTENTT+"\t"+SGRY+"\t"+DATES+"\t"+CHEMO+"\t"+STARTC+"\t"+ENDCHEMO+"\t"+IMMUNO+"\t"+STARTI+"\t"+ENDIMMUNO+"\t"+HPVASS+"\t"+RADIO+"\t"+
                        STARTR+"\t"+ENDRADIO+"\t"+HORMO+"\t"+STARTH+"\t"+ENDHORMO+"\t"+PALLIA+"\t"+DATEP+"\t"+OTHERT+"\t"+SPECIFYOT+"\t"+STARTOT+"\t"+ENDOT;
                
                tumourTableData = tumourTableData+ "\n" +tumourTableRow;
                } 
            })
            })
        });

        const aElement = document.createElement("a");
        const fileContents = new Blob([tumourTableData], {type: 'text/plain;charset=utf-8'});
        aElement.href = URL.createObjectURL(fileContents);
        aElement.download = "tumour_data.txt";
        document.body.appendChild(aElement); // Required for this to work in FireFox
        aElement.click();

*/

var contacts = "REGNO"+"\t"+"PERS"+"\t"+"IDENTITYCARD"+"\t"
+"SURNAME"+"\t"+"FIRSTN"+"\t"+"SEX"+"\t"+"BIRTHD"+"\t"+"PHONE1"
+"\t"+"PHONEN2"+"\t"+"NKNAME"+"\t"+"TNNK"+"\t"+"NATIONALITY"
+"\t"+"DLC"+"\t"+"STATUS"+"\t"+"ONCOPR"
+"\t"+"IFALIVE"+"\t"+"PROGRESSION"+"\t"+"CAUSEDEATH"+"\t"+"PLACED"+"\t"+"OCD"+"\t"+"OBSOLETEFLAGPATIENTTABLE"+
"\t"+"PATIENTRECORDID"+"\t"+"PATIENTUPDATEDBY"+"\t"+"PATIENTUPDATEDATE"+"\t"+"PATIENTRECORDSTATUS"+
"\t"+"PATIENTCHECKSTATUS"+"\t"+"REMARKS";

//variable declaration...

var aregno="";
var afname="";
var lname=""
var emails="";
var age="";
var idnums="";
var genders="";
var bds="";
var mdates="";
var phn="";
var phn1="";
var nkin="";
var natn="";
var stus="";
var oncopr="";
var progress="";
var csdeath="";
var placd="";

// end of global variable declaration...


trackedEntityInstances.map((itemp) => {
    itemp.enrollments.map((enrolmnt) => {
        enrolmnt.events.map((evts) => {

            if(evts.programStage=="yj7nAGqKXZw")
            {
                evts.dataValues.map(function(dtvalues, i){
            
            if(dtvalues.dataElement=="ya7NvvPZ6NE")
            {
                //console.log(dtvalues.value);
                stus=dtvalues.value;
            }
            
            if(dtvalues.dataElement=="TFmh28f4Ylz")
            {
                //console.log(dtvalues.value);
                oncopr=dtvalues.value;
            }
            if(dtvalues.dataElement=="CiP6FnZEAr7")
            {
                //console.log(dtvalues.value);
                progress=dtvalues.value;
            }
            if(dtvalues.dataElement=="amOhRQ0vBI7")
            {
                //console.log(dtvalues.value);
                csdeath=dtvalues.value;
            }
            if(dtvalues.dataElement=="CMycg9jCdw3")
            {
                //console.log(dtvalues.value);
                placd=dtvalues.value;
            }
            
            
            
            
            
            
            
            })
            }

        })
    })


      
    itemp.attributes.map(function(itm, i){
          
        if(itm.attribute=="Yp8W95xlxMv")
        {
          natn=itm.value;
        
        }
        if(itm.attribute=="iUkIkQbkxI1")
        {
          phn=itm.value;
        
        }
        if(itm.attribute=="YfjjdE6XOBu")
        {
          nkin=itm.value;
        
        }
        if(itm.attribute=="dd98c7o6RjZ")
        {
          phn1=itm.value;
        
        }
        
        
        
        
        
        if(itm.attribute=="PTGSZmTk3IQ")
        {
          aregno=itm.value;
          var strFirstThree = aregno.substring(0,2);
    
          var regnolength=aregno.toString().length
          
          if(regnolength=="9")
          {
          
            aregno=aregno.substring(1,9); 
          
          }
    
          if(strFirstThree=="CR")
          {
            var n1=aregno.substring(5,8);
            var n2=aregno.substring(9,14);
            aregno=n1+n2; 
          }
        }
    
        if(itm.attribute=="m1At2P4UT9e")
        {
          mdates=itm.value;
          var pyear=mdates.substring(0,4);
          var pmonth=mdates.substring(5,7);
          var pdate=mdates.substring(8,10);
          bds=pyear+pmonth+pdate;
    
        }
        if(itm.attribute=="l93yUywzP20")
        {
          genders=itm.value;
         
        }
        
        if(itm.attribute=="LbuO5oeODsy")
        {
          idnums=itm.value;
          idnums=idnums;
        }
        if(itm.attribute=="mJ3oYSkDyWz")
        {
          afname=itm.value;
        }
    
        if(itm.attribute=="Uda5alDG8P5")
        {
          lname=itm.value;
        }
        if(itm.attribute=="dd98c7o6RjZ")
        {
          emails=itm.value;
        }
        if(itm.attribute=="m1At2P4UT9e")
        {
          age=itm.value;
        }
      
      })

//finalizing the declaration and map the values into one single variable so that it can be exported in a file
   
      var prss="0";
      var tnnk="-1";
     
      
      var ifall="1";
      
      
      
      var ocd="";
      var obsplaq="0";
      var patrecid=aregno+"01";
      var recby="Winny";
      var patrecstatus="0";
      var checkstatus="0";
      var remark="";
      var fullstring=aregno+"\t"+prss+"\t"+idnums+"\t"+afname+"\t"+lname+"\t"+genders+
      "\t"+bds+"\t"+phn+"\t"+phn1+"\t"+nkin+"\t"+tnnk+
      "\t"+natn+"\t"+bds+"\t"+stus+"\t"+
      oncopr+"\t"+ifall+"\t"+progress+"\t"+csdeath+"\t"+placd+"\t"+ocd+"\t"+obsplaq+"\t"+patrecid+
      "\t"+recby+"\t"+bds+"\t"+patrecstatus+"\t"+checkstatus+"\t"+remark;
        
             contacts=contacts+'\n'+fullstring;











});

if(!(aregno==""))
{
const element = document.createElement("a");
const file = new Blob([contacts], {type: 'text/plain;charset=utf-8'});
element.href = URL.createObjectURL(file);
element.download = "patient_data.txt";
document.body.appendChild(element); // Required for this to work in FireFox
element.click();

}

    }

    // Refetches and updates the tumour data as long as the Filter button is clicked
    const updateFetchInfo = (startDate, endDate, orgUnitID) => {
        refetch({ 
            startDate: startDate,
            endDate: endDate,
            orgUnitID: orgUnitID 
        })
    }

    return (

        <div className={classes.tableContainer}>
          <div className='products'>
            <DataFilterHeaderView onUpdateFetchInfo={updateFetchInfo} provinces={data.provinces.children}/>
            
            
            <Table>
                                <TableHead>
                                    <TableRowHead>
                                        <TableCellHead className={styles.leftcell}>
                                            <div className={styles.row}>
                                                <div className={styles.downloadfiles}>
                                             
             
                                                <Button primary onClick={() => {exportTSVFile(data.results.trackedEntityInstances)}}>{i18n.t('Download Patient Data')} </Button>
              </div>


             
                                            </div>
                                        </TableCellHead>

                                    
                                    </TableRowHead>
                                </TableHead>
                            </Table>

            
            
            
            
            
 

            <Table>
            <TableHead>
                <TableRowHead>
                <TableCellHead>First name</TableCellHead>
                            <TableCellHead>Last name</TableCellHead>
                            <TableCellHead>Phone Number</TableCellHead>
                            <TableCellHead>DOB</TableCellHead>

                            <TableCellHead>UID</TableCellHead>
                            <TableCellHead>Other Phone</TableCellHead>
                            <TableCellHead>Status</TableCellHead>
               
               
                </TableRowHead>
            </TableHead>
            <TableBody>
                {data.results.trackedEntityInstances.map((item) => (


            <TableRow>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'mJ3oYSkDyWz'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'Uda5alDG8P5'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'dd98c7o6RjZ'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'm1At2P4UT9e'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>

                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'PTGSZmTk3IQ'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'dd98c7o6RjZ'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>Incomplete</TableCell>
                            </TableRow>



                ))
                }
                </TableBody>
            </Table>
        </div>
            <PaginationControls pager={data.results.pager} refetch={refetch} />
        </div>
    )
}