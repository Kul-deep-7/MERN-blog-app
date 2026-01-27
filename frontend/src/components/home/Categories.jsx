
import { Button, Table ,TableBody,TableCell, TableHead, TableRow, styled } from '@mui/material'


import React from 'react'
import { categories } from '../../constants/data'
import { Link, useSearchParams } from 'react-router-dom'

const StyledButton = styled(Button)`
    margin:20px;
    width:85%;
    background: #FD6415;
    color: #000000;

`
const StyledLink = styled(Link) //doing this cuz text is underlined cuz of some React glitch
`
    text-decoration : none;  
`

export default function Categories() {

    /*useSearchParams lets you read and write query parameters in the URL. Query params are the part after ?. EG: /?category=Music or /create?category=Tech
    Why do we need ? in the URL?
    Because ? means:“Everything after this is extra information, not a new page.”

    URL has TWO parts: /create?category=sports
    1. Path (page): /create
    This decides which page/component opens.Okay, render <Create /> page

    2. Query params (data): ?category=sports
    This does NOT change the page. It only passes data to the same page. Hey, open /create… but keep sports in mind.

    */

    const [searchParams] = useSearchParams()
    const urlcategory = searchParams.get('categ'); //From the URL, give me the value of category. So if the URL is: /?category=Sports. Then category === "Sports". If the URL is "/" category === null
    //what get() does is “From the URL, give me the value whose key is category.”


  return (
    <>
    <StyledLink to={`/create?categ=${urlcategory || ''}`}> {/* If urlCategory exists, use it.If it doesn’t, use an empty string instead.*/}
        <StyledButton>Create Blog</StyledButton> 
{/*“If I click Create Blog after selecting a category, the URL changes to /create?category=Sports so the Create Post page knows which category the user selected. */}
    </StyledLink>
        

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <StyledLink to='/'>
                            All Categories
                        </StyledLink>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    categories.map(category =>{
                        return (
                        <TableRow key={category.id}>
                            <TableCell>
                                <StyledLink to={`/?categ=${category.type}`}>
                                    {category.type}
{/* We imported categories and mapped over them to display all category names, but we also wrapped each category inside a Link. When a category like Sports is clicked, React Router updates the URL to /?category=Sports*/}
                                </StyledLink>
                            </TableCell>
                        </TableRow>
                        )
                    })
                }
                
            </TableBody>
        </Table>
    </>
  )
}
