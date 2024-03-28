import React from 'react';
import { Document, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import Box from '@mui/material/Box';

// Styles pour le PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  eventContainer: {
    marginBottom: 10,
  },
  eventName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 12,
  },
});

// Exemples d'événements pour chaque semestre
const events = {
  semester1: [
    { name: 'Rentrée universitaire', date: '1er Septembre 2024' },
    { name: 'Vacances de la Toussaint', date: '20 Octobre - 3 Novembre 2024' },
    // Ajoutez d'autres événements du semestre 1 ici
  ],
  semester2: [
    { name: 'Rentrée du semestre 2', date: '6 Janvier 2025' },
    { name: 'Vacances de Printemps', date: '6 Avril - 20 Avril 2025' },
    // Ajoutez d'autres événements du semestre 2 ici
  ],
};

// Fonction pour générer les événements sous forme de texte
const renderEvents = (events) => (
  <View style={styles.eventContainer}>
    {events.map((event, index) => (
      <View key={index}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={styles.eventDate}>{event.date}</Text>
      </View>
    ))}
  </View>
);

// Fonction pour générer le calendrier universitaire sous forme de PDF
const CalendarPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Calendrier Universitaire 2024-2025</Text>
    </Page>
  </Document>
);

const CalendarViewer = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px' }}>
      <h1 style={{ textAlign: 'center' }}>Calendrier Universitaire</h1>
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <CalendarPDF />
      </PDFViewer>
    </Box>
  );
};

export default CalendarViewer;
