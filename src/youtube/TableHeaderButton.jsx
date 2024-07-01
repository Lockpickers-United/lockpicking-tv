import React from 'react'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import Blank24x24 from '../assets/Blank24x24.jsx'

export default function TableHeaderButton({handleSort, column, reverse, sort}) {

    let sortIcon = <Blank24x24/>
    let weight = 500

    if (sort && (sort === column && reverse === 'Asc') || sort === column + 'Desc') {
        sortIcon = <ArrowDropDownIcon/>
        weight = 700
    } else if (sort && (sort === column && reverse === 'Desc') || sort === column + reverse) {
        sortIcon = <ArrowDropUpIcon/>
        weight = 700
    }

    return (
        <Button variant='text' startIcon={sortIcon} size='small'
                onClick={() => {
                    handleSort(column, reverse)
                }}
                sx={{fontWeight: weight, padding:'3px'}}
        >
            {column}
        </Button>
    )

}