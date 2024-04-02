import React from 'react'; 
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { ExternalLinkIcon, CalendarIcon } from '@chakra-ui/icons'; // Importer l'icône de calendrier

function AnnonceE(props) {
  // Obtenir la date actuelle au format français
  const currentDate = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <Accordion allowToggle width="800px" marginLeft="100px" marginTop="40px">
      <AccordionItem>
        <h2>
          <AccordionButton height="60px" sx={{ border: '1px solid lightgray', borderRadius: '5px' }} _expanded={{ bg: '#4299E1', color: 'white' }}>
            <Box as="span" flex="1" textAlign="left" height="20" textstyle="h1" style={{ marginLeft: '10px', marginTop:'8px', fontSize:'15px' }}>
              Annonce 1 title
            </Box>
            <Box as="span" display="flex" alignItems="center">
              <CalendarIcon marginRight="5px" /> {/* Afficher l'icône de calendrier */}
              <span>{currentDate}</span> {/* Afficher la date actuelle */}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
          <Link href='https://chakra-ui.com' isExternal> Voir plus <ExternalLinkIcon mx='2px' /></Link>   
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default AnnonceE;
