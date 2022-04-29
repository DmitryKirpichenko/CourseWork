import React from 'react'

import MyTable from './OperatorTable/MyTable'

import StreetTable from './StreetTable/StreetTable'

function TableIndex({state, rowss}){
    if(state == 1){
        return (
            <MyTable rowss={rowss}></MyTable>
        )
    }
    else{
        return(
            <StreetTable></StreetTable>
        )
    }
}

export default TableIndex;