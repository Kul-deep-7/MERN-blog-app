
import { Button, Table ,TableBody,TableCell, TableHead, TableRow, styled } from '@mui/material'


import React from 'react'
import { categories } from '../../constants/data'
import { Link } from 'react-router-dom'

const StyledButton =styled(Button)`
    margin:20px;
    width:85%;
    background: #FD6415;
    color: #000000;

`


export default function Categories() {
  return (
    <>
    <Link to='/create'>
        <StyledButton>Create Blog</StyledButton>
    </Link>
        

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        All Categories
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    categories.map(category =>{
                        return (
                        <TableRow key={category.id}>
                            <TableCell>{category.type}</TableCell>
                        </TableRow>
                        )
                    })
                }
                
            </TableBody>
        </Table>
    </>
  )
}
