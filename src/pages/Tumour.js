import { useDataQuery, useAlert } from '@dhis2/app-runtime'
import { Button, CircularLoader, InputField, Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from "@dhis2/ui";

import { AllRecordsHeaderView } from './AllRecordsHeaderView'
import React, { useState } from 'react'

import { PaginationControls } from './TumourComponents/PaginationControls'
import * as classes from '../App.module.css'
import i18n from "../locales/index.js";
import styles from './Form.module.css'

import { formatTodayDate } from "../app_utils/App_Utils";

const eventsQuery = {
    results: {
        resource: 'trackedEntityInstances.json',
        params: ({ page, startDate, endDate, orgUnitID, pageSize, ouMode }) => ({
            page: page,
            ou: orgUnitID,
            ouMode: ouMode,
            program: 'rx6V962E4XM',
            fields: ['attributes[attribute,value],enrollments[trackedEntityInstance,enrollment,events[storedBy,event,programStage,dataValues[dataElement,value]]]'],
            programStartDate:startDate,
            programEndDate:endDate,
            totalPages: true,
            pageSize: pageSize,
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

export const Tumour = () => {
    const [forFileDownload, setForFileDownload] = useState(false)


    let RECS = "1", CHEC = "1", HIVSTATUS = "", DATEHIVTEST = "", AGE = "",ADDR= "",SECTOR= "",	CELL= "", VILLAGE="", MPCODE="", MPSEQ= "",MPTOT= "",INCID= "",BAS= "",TOP= "",BEH= "",
    LATERALITY="",MOR="",I10="",ICCC="",GRDE="",STAGE="",T="",N="",M="",UPDATE=formatTodayDate(),OBSOLETEFLAGTUMOURTABLE="0",TUMOURID= "",PATIENTIDTUMOURTABLE= "",PATIENTRECORDIDTUMOURTABLE="",TUMOURUPDATEDBY="",TUMOURUNDUPLICATIONSTATUS="",INITIALT="",INTENTT="",SGRY="",DATES="",CHEMO="",STARTC="",ENDCHEMO="",IMMUNO="",STARTI="",ENDIMMUNO="",HPVASS="",RADIO="",STARTR="",ENDRADIO="",HORMO="",STARTH="",ENDHORMO="",PALLIA="",DATEP="",OTHERT="",SPECIFYOT="",STARTOT="",ENDOT="";

    const tumourTableHeaders = "RECS"+"\t"+"CHEC"+"\t"+"HIVSTATUS"+"\t"+"DATEHIVTEST"+"\t"+"AGE"+"\t"+"ADDR"+"\t"+"SECTOR"+"\t"+"CELL"+"\t"+"VILLAGE"+"\t"+"MPCODE"+"\t"+"MPSEQ"+"\t"+"MPTOT"+"\t"+"INCID"+"\t"+"BAS"+"\t"+"TOP"+"\t"+"BEH"+"\t"+
            "LATERALITY"+"\t"+"MOR"+"\t"+"I10"+"\t"+"ICCC"+"\t"+"GRDE"+"\t"+"STAGE"+"\t"+"T"+"\t"+"N"+"\t"+"M"+"\t"+"UPDATE"+"\t"+"OBSOLETEFLAGTUMOURTABLE"+"\t"+"TUMOURID"+"\t"+"PATIENTIDTUMOURTABLE"+"\t"+"PATIENTRECORDIDTUMOURTABLE"+"\t"+"TUMOURUPDATEDBY"+"\t"+"TUMOURUNDUPLICATIONSTATUS"+"\t"+"INITIALT"+"\t"+"INTENTT"+"\t"+"SGRY"+"\t"+"DATES"+"\t"+"CHEMO"+"\t"+"STARTC"+"\t"+"ENDCHEMO"+"\t"+"IMMUNO"+"\t"+"STARTI"+"\t"+"ENDIMMUNO"+"\t"+"HPVASS"+"\t"+"RADIO"+"\t"+"STARTR"+"\t"+"ENDRADIO"+"\t"+"HORMO"+"\t"+"STARTH"+"\t"+"ENDHORMO"+"\t"+"PALLIA"+"\t"+"DATEP"+"\t"+"OTHERT"+"\t"+"SPECIFYOT"+"\t"+"STARTOT"+"\t"+"ENDOT";
    
    const formatPatientID = (oldID) => {
        var newID
        if (oldID.length == 9) { 
            newID = oldID.substring(0, 4) + oldID.substring(5);
        } else if  (oldID.length == 14) { 
            newID = oldID.substring(4, 8) + oldID.substring(10);
        }else {
            newID = oldID
        }
        return newID;
    }

    const formatCanRegDate = (dhis2DateFormat) => {
        let rawDate = dhis2DateFormat
        let pyear= rawDate.substring(0,4);
        let pmonth= rawDate.substring(5,7);
        let pdate= rawDate.substring(8,10);
        let canRegDateFormat = pyear+pmonth+pdate;
        return canRegDateFormat;
    }

    const exportTSVFile = (trackedEntityInstances) =>{        
        let tumourTableData = tumourTableHeaders;
        
        trackedEntityInstances.map((tei) => {
            let uniqueId = ''
            let aregnoOld = ''
            let tumourCounts = 0
            let tumourEvents = []
            tei.attributes.map((item) => {
                if (item.attribute == 'uWRHiEUPnP7') {
                    uniqueId = item.value
                }
                if(item.attribute=="PTGSZmTk3IQ") {
                    aregnoOld=item.value
                    }
            })
            
            // Getting the number of Tumour  stage events present in the current enrollment
            tei.enrollments.map((enrollment) => {
                enrollment.events.map((teiEvent) => {
                    if(teiEvent.programStage=="Y0cWLBEdXzb"){
                        tumourCounts ++
                        tumourEvents.push(teiEvent)
                    } 
                })
            })
            
            for (let i = 0; i < tumourEvents.length; i++) {
                let teiEvent = tumourEvents[i]
                
                // Filling MPSEQ, MPTOT, TUMOURID, PATIENTIDTUMOURTABLE, and PATIENTRECORDIDTUMOURTABLE using patient unique ID
                MPSEQ = (i+1)

if(uniqueId=='')
{
    uniqueId=aregnoOld;   
}

                MPTOT = tumourEvents.length
                TUMOURID = uniqueId + '010'+ (i+1);
                PATIENTIDTUMOURTABLE = uniqueId;
                PATIENTRECORDIDTUMOURTABLE = uniqueId +'01';
                TOP ="";
     HIVSTATUS = "", DATEHIVTEST = "", AGE = "",ADDR= "",SECTOR= "",	CELL= "", VILLAGE="", MPCODE="", MPSEQ= "",MPTOT= "",INCID= "",BAS= "",TOP= "",BEH= "",
    LATERALITY="",MOR="",I10="",ICCC="",GRDE="",STAGE="",T="",N="",M="",TUMOURUPDATEDBY="",TUMOURUNDUPLICATIONSTATUS="",INITIALT="",INTENTT="",SGRY="",DATES="",CHEMO="",STARTC="",ENDCHEMO="",IMMUNO="",STARTI="",ENDIMMUNO="",HPVASS="",RADIO="",STARTR="",ENDRADIO="",HORMO="",STARTH="",ENDHORMO="",PALLIA="",DATEP="",OTHERT="",SPECIFYOT="",STARTOT="",ENDOT="";

                // Filling the rest of the tumor table fields
                teiEvent.dataValues.map((dataValue) =>{
                    if(dataValue.dataElement == "XBZsBO1iIMu") { HIVSTATUS = dataValue.value }
                    if(dataValue.dataElement == "w3hjoxhRdxX") { DATEHIVTEST = formatCanRegDate(dataValue.value) }
                    if(dataValue.dataElement == "Lklmhjoa2VZ") { AGE = dataValue.value }
                    if(dataValue.dataElement == "YjyatbcXrAB") { ADDR = dataValue.value }
                    if(dataValue.dataElement == "R7C6qavR1By") { SECTOR = dataValue.value }
                    if(dataValue.dataElement == "JoiKTef007f") { CELL = dataValue.value }
                    if(dataValue.dataElement == "hNjuN29oWEo") { VILLAGE = dataValue.value }
                    if(dataValue.dataElement == "qiPi86HJH9D") { INCID = formatCanRegDate(dataValue.value) }
                    if(dataValue.dataElement == "b4nlCulDaNv") { BAS = dataValue.value }
                    if(dataValue.dataElement == "mIGq36ORtj5") { TOP = dataValue.value }
                    if(dataValue.dataElement == "R3V4FZ7bm1Z") { BEH = dataValue.value }
                    if(dataValue.dataElement == "pUcbnDZTKWO") { LATERALITY = dataValue.value }
                    if(dataValue.dataElement == "g4InB94akRh") { MOR = dataValue.value }
                    if(dataValue.dataElement == "MiCTO3OgRB8") { GRDE = dataValue.value }
                    if(dataValue.dataElement == "lsyoWxLKpcg") {  dataValue.value == "Unkwown"? STAGE = "XX" : STAGE = dataValue.value  }
                    if(dataValue.dataElement == "jufaPpTt33C") { T = dataValue.value }
                    if(dataValue.dataElement == "crCh4AWyhEQ") { N = dataValue.value }
                    if(dataValue.dataElement == "YU85aZgUvpI") { M = dataValue.value }
                    TUMOURUPDATEDBY = teiEvent.storedBy?teiEvent.storedBy:"";
                    if(dataValue.dataElement == "QDYFCDo0kLm") { INITIALT = dataValue.value }
                    if(dataValue.dataElement == "EJi6tdw5T1v") { INTENTT = dataValue.value }
                    if(dataValue.dataElement == "lb1iN94cSNn") { SGRY = dataValue.value }
                    if(dataValue.dataElement == "NzUoPBTcUme") { formatCanRegDate(DATES = dataValue.value) }
                    if(dataValue.dataElement == "tmy8Js2OerA") { CHEMO = dataValue.value }
                    if(dataValue.dataElement == "dqLzVzpPBQk") { STARTC = formatCanRegDate(dataValue.value) }
                    if(dataValue.dataElement == "qKApg9EbBvP") { ENDCHEMO = formatCanRegDate(dataValue.value) }
                    if(dataValue.dataElement == "qhTmdhweTY6") { IMMUNO = dataValue.value }
                    if(dataValue.dataElement == "UH0QjAVVpBw") { STARTI = formatCanRegDate(dataValue.value) }
                    if(dataValue.dataElement == "Os8vbHJ3qoc") { ENDIMMUNO = formatCanRegDate(dataValue.value) }
                    if(dataValue.dataElement == "simuoODFRUc") { RADIO = dataValue.value }
                    if(dataValue.dataElement == "KuewOYQYRq7") { STARTR = formatCanRegDate(dataValue.value) }
                    if(dataValue.dataElement == "THtdWv46cXH") { ENDRADIO = formatCanRegDate(dataValue.value) }
                    if(dataValue.dataElement == "QKXwZ57aGdH") { HORMO = dataValue.value }
                    if(dataValue.dataElement == "pazmxkluuAK") { STARTH = formatCanRegDate(dataValue.value) }
                    if(dataValue.dataElement == "ZTtTjPPKemm") { ENDHORMO = formatCanRegDate(dataValue.value) }
                    if(dataValue.dataElement == "N6J5Bp9auN9") { PALLIA = dataValue.value }
                    if(dataValue.dataElement == "KWsp9YpTp8O") { DATEP = formatCanRegDate(dataValue.value) }
                    if(dataValue.dataElement == "YYW855k5GgW") { OTHERT = dataValue.value }
                    if(dataValue.dataElement == "tfeZgkgqJC9") { SPECIFYOT = dataValue.value }
                    
                });
                var tumourTableRow = RECS+"\t"+CHEC+"\t"+HIVSTATUS+"\t"+DATEHIVTEST+"\t"+AGE+"\t"+ADDR+"\t"+SECTOR+"\t"+CELL+"\t"+VILLAGE+"\t"+MPCODE+"\t"+MPSEQ+"\t"+MPTOT+"\t"+INCID+"\t"+BAS+"\t"+TOP+"\t"+BEH+"\t"+
                LATERALITY+"\t"+MOR+"\t"+I10+"\t"+ICCC+"\t"+GRDE+"\t"+STAGE+"\t"+T+"\t"+N+"\t"+M+"\t"+UPDATE+"\t"+OBSOLETEFLAGTUMOURTABLE+"\t"+TUMOURID+"\t"+PATIENTIDTUMOURTABLE+"\t"+PATIENTRECORDIDTUMOURTABLE+"\t"+
                TUMOURUPDATEDBY+"\t"+TUMOURUNDUPLICATIONSTATUS+"\t"+INITIALT+"\t"+INTENTT+"\t"+SGRY+"\t"+DATES+"\t"+CHEMO+"\t"+STARTC+"\t"+ENDCHEMO+"\t"+IMMUNO+"\t"+STARTI+"\t"+ENDIMMUNO+"\t"+HPVASS+"\t"+RADIO+"\t"+
                                STARTR+"\t"+ENDRADIO+"\t"+HORMO+"\t"+STARTH+"\t"+ENDHORMO+"\t"+PALLIA+"\t"+DATEP+"\t"+OTHERT+"\t"+SPECIFYOT+"\t"+STARTOT+"\t"+ENDOT;
                
                if ( (PATIENTIDTUMOURTABLE.length == 8) ) {
                    tumourTableData = tumourTableData+ "\n" +tumourTableRow;
                } 
            }
        });

        const aElement = document.createElement("a");
        const fileContents = new Blob([tumourTableData], {type: 'text/plain;charset=utf-8'});
        aElement.href = URL.createObjectURL(fileContents);
        aElement.download = "tumour_data.txt";
        document.body.appendChild(aElement); // Required for this to work in FireFox
        aElement.click();

        // Reset file dowload to false
        setForFileDownload(false)

        // Show paginated list again
        refetch({ 
            pageSize: 5
        })
    }
    
    // A dynamic alert to communicate success or failure 
    const { show } = useAlert(
        ({ message }) => message,
        ({ status }) => {
            if (status === 'success') return { success: true }
            else if (status === 'error') return { critical: true }
            else return {}
        } )

    // A dynamic useDataQuery hook to retrieve tumor events data
    const { loading, error, data, refetch } = useDataQuery(eventsQuery, {
        variables: { page: 0, startDate: '2018-01-01', endDate: '2021-07-18', orgUnitID: 'OujzhM1lgN5', pageSize: 5, ouMode: 'SELECTED'},
    })

    if (error) {  
        const message = 'ERROR: ' + error.message
        show({ message, status: 'error' })
        return (
            <> </>
        )
    }

    if (loading) {
        let provinces = []
        return (
            <>
                {/* <AllRecordsHeaderView provinces={provinces}/> */}
                <CircularLoader />
            </>
        )
    }

    if (data.results.trackedEntityInstances) {  
        const message = 'SUCCESS: Successfully retrieved tumor events.'
        if (forFileDownload) {
            exportTSVFile(data.results.trackedEntityInstances)
        }
        show({ message, status: 'success' })
    }

    const updateDowloadInfo = (pageSize) =>{
        setForFileDownload(true)

        refetch({ 
            pageSize: pageSize
        })
    }

    // Refetches and updates the tumour data as long as the Filter button is clicked
    const updateFetchInfo = (startDate, endDate, orgUnitID, ouMode) => {
        refetch({ 
            startDate: startDate,
            endDate: endDate,
            orgUnitID: orgUnitID,
            ouMode: ouMode
        })
        setForFileDownload(false)
    }

    return (

        <div className={classes.tableContainer}>
          <div className='products'>
            <AllRecordsHeaderView onUpdateFetchInfo={updateFetchInfo} provinces={data.provinces.children}/>
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead className={styles.leftcell}>
                            <div className={styles.row}>
                                <div className={styles.downloadfiles}>
                                    <Button primary onClick={() => updateDowloadInfo( data.results.pager.total)}>{i18n.t('Download Tumour Data')} </Button>
                                </div>
                            </div>
                        </TableCellHead>
                    </TableRowHead>
                </TableHead>
            </Table>
            <Table>
            <TableHead>
                <TableRowHead>
                <TableCellHead>AGE</TableCellHead>
                <TableCellHead>ADDR</TableCellHead>
                <TableCellHead>MPTOT</TableCellHead>
                <TableCellHead>INCID</TableCellHead> 
                <TableCellHead>BAS</TableCellHead>
                <TableCellHead>TOP</TableCellHead>
                <TableCellHead>BEH</TableCellHead>
                <TableCellHead>PATIENTIDTUMOURTABLE</TableCellHead>
                <TableCellHead>TUMOURIDSOURCETABLE</TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody>
                {data.results.trackedEntityInstances.map((tei) => (
                tei.enrollments.map((enrollment) => (
                    enrollment.events.map((teiEvent) => (
                    teiEvent.programStage=="Y0cWLBEdXzb"?
                    <TableRow key={teiEvent.event}> 
                        <TableCell>{teiEvent.dataValues.map(dataValue => dataValue.dataElement=="Lklmhjoa2VZ"?dataValue.value:"")}</TableCell>
                        <TableCell>{teiEvent.dataValues.map(dataValue => dataValue.dataElement=="YjyatbcXrAB"?dataValue.value:"")}</TableCell>
                        <TableCell>{teiEvent.dataValues.map(dataValue => dataValue.dataElement=="QsbsNHyRwcu"?dataValue.value:"")}</TableCell>
                        <TableCell>{teiEvent.dataValues.map(dataValue => dataValue.dataElement=="qiPi86HJH9D"? formatCanRegDate(dataValue.value):"")}</TableCell>
                        <TableCell>{teiEvent.dataValues.map(dataValue => dataValue.dataElement=="b4nlCulDaNv"?dataValue.value:"")}</TableCell>
                        <TableCell>{teiEvent.dataValues.map(dataValue => dataValue.dataElement=="mIGq36ORtj5"?dataValue.value:"")}</TableCell>
                        <TableCell>{teiEvent.dataValues.map(dataValue => dataValue.dataElement=="pUcbnDZTKWO"?dataValue.value:"")}</TableCell>
                        <TableCell>{teiEvent.dataValues.map(dataValue => dataValue.dataElement=="U6uTS5AuKQi"?formatPatientID(dataValue.value):"")}</TableCell>
                        <TableCell>{teiEvent.dataValues.map(dataValue => dataValue.dataElement=="U6uTS5AuKQi"?formatPatientID(dataValue.value) + '01':"")}</TableCell>
                        </TableRow>
                        : 
                        <TableRow key={teiEvent.event}></TableRow>
                    ))
                ))
                ))
                }
                </TableBody>
            </Table>
        </div>
            <PaginationControls pager={data.results.pager} refetch={refetch} />
        </div>
    )
}
