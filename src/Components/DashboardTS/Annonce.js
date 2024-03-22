import React from 'react'; 
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box ,
  
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/react'
import { CalendarIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { MdOutlineCalendarMonth } from '@fortawesome/free-solid-svg-icons';
import { Style } from '@mui/icons-material';
function AnnonceE(props) {
  return (
    <Accordion allowToggle width= '400'>
      <AccordionItem  >
        <h2>
          <AccordionButton height='50px' sx={{ border: '1px solid lightgray', borderRadius: '5px'  }} _expanded={{ bg: '#4299E1'

, color: 'white' }}>
            <MdOutlineCalendarMonth style={{ fontSize: '30px', color: '#90CDF4' }} />

            <Box as="span" flex='1' textAlign='left' height='20' textstyle='h1' style={{ marginLeft: '10px',marginTop:'8px',fontSize:'15px' }} >
                Annone 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
          <Link href='https://chakra-ui.com' isExternal> Voir plus <ExternalLinkIcon mx='2px' />
</Link>   
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem  >
        <h2>
          <AccordionButton height='50px' sx={{ border: '1px solid lightgray', borderRadius: '5px'  }} _expanded={{ bg: '#4299E1'

, color: 'white' }}>
            <MdOutlineCalendarMonth style={{ fontSize: '30px', color: '#90CDF4' }} />

            <Box as="span" flex='1' textAlign='left' height='20' textstyle='h1' style={{ marginLeft: '10px',marginTop:'8px',fontSize:'15px' }} >
                Annone 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
          <Link href='https://chakra-ui.com' isExternal> Voir plus <ExternalLinkIcon mx='2px' />
</Link>   
        </AccordionPanel>
    </AccordionItem>
    </Accordion>
  );
}

export default AnnonceE;
