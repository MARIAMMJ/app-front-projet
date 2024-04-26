import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CompteRenduPage = () => {
    const [selectedFiliere, setSelectedFiliere] = useState('');
    const [selectedClasse, setSelectedClasse] = useState('');
    const [selectedCR, setSelectedCR] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newCR, setNewCR] = useState({ titre: '', description: '', deadline: '' });

    const handleFiliereSelect = (event) => {
        setSelectedFiliere(event.target.value);
    };

    const handleCRDeposit = () => {
        // Ajoutez ici la logique pour gérer le dépôt du compte rendu par l'étudiant
    };
    
    const handleClasseSelect = (event) => {
        setSelectedClasse(event.target.value);
    };

    const handleCRSelect = (cr) => {
        setSelectedCR(cr);
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleNewCRChange = (event) => {
        setNewCR({ ...newCR, [event.target.name]: event.target.value });
    };

    const handleAddCR = () => {
        console.log('Nouveau compte rendu:', newCR);
        setNewCR({ titre: '', description: '', deadline: '' });
        setOpenDialog(false);
    };

    const handlePDFUpload = (event) => {
        // Logique pour le téléchargement du PDF
        const file = event.target.files[0];
        console.log('Fichier PDF ajouté:', file);
    };

    const classes = ['Groupe 1', 'Groupe 2', 'Groupe3'];

    const comptesRendus = [
        { titre: 'CR 1', description: 'Description du CR 1', dateDepot: '2024-03-28', deadline: '2024-03-31', etudiants: [{ nom: 'Etudiant 1', aDepose: true, dateDepot: '2024-03-27' }, { nom: 'Etudiant 2', aDepose: false, dateDepot: '' }] },
        { titre: 'CR 2', description: 'Description du CR 2', dateDepot: '2024-03-30', deadline: '2024-03-29', etudiants: [{ nom: 'Etudiant 1', aDepose: true, dateDepot: '2024-03-29' }, { nom: 'Etudiant 2', aDepose: true, dateDepot: '2024-03-30' }] }
    ];

    return (
        <Container>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={8} md={4} style={{ marginBottom: '0px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="filiere-label">Filière</InputLabel>
                        <Select
                            labelId="filiere-label"
                            value={selectedFiliere}
                            onChange={handleFiliereSelect}
                            fullWidth
                            size="small"
                        >
                            <MenuItem value="">Choisir une filière</MenuItem>
                            <MenuItem value="Filière A">1ere ING</MenuItem>
                            <MenuItem value="Filière B">2eme ING - GL</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {selectedFiliere && (
                    <Grid item xs={8} md={4} style={{ marginBottom: '10px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="classe-label">Classe</InputLabel>
                            <Select
                                labelId="classe-label"
                                value={selectedClasse}
                                onChange={handleClasseSelect}
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="">Choisir une classe</MenuItem>
                                {classes.map((classe, index) => (
                                    <MenuItem key={index} value={classe}>{classe}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}
                {selectedClasse && (
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {comptesRendus.map((cr, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card onClick={() => handleCRSelect(cr)} style={{ cursor: 'pointer', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent style={{ flexGrow: 1 }}>
                                            <Typography variant="h5" component="h2">{cr.titre}</Typography>
                                            <Typography>{cr.description}</Typography>
                                            <Typography variant="caption" style={{ marginTop: '5px' }}>Deadline: {cr.deadline}</Typography>
                                        </CardContent>
                                        <div style={{ position: 'absolute', top: 10, right: 10 }}>
                                            {new Date(cr.deadline) > new Date() ? <div style={{ backgroundColor: 'green', width: '20px', height: '20px', borderRadius: '50%' }}></div> : <div style={{ backgroundColor: 'red', width: '20px', height: '20px', borderRadius: '50%' }}></div>}
                                        </div>
                                        <Button variant="outlined" component="span" sx={{marginBottom:"10px" , width:"250px" ,marginLeft:"40px"}} onClick={() => handlePDFUpload(cr)}>Télécharger l'enoncee</Button>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Button variant="contained" onClick={handleDialogOpen} style={{ marginTop: '20px' }}>Ajouter un compte rendu</Button>
                    </Grid>
                )}
                {selectedCR && (
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom de l'Étudiant</TableCell>
                                        <TableCell>A déposé le CR</TableCell>
                                        <TableCell>Date de dépôt</TableCell>
                                        <TableCell>Les CRs</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedCR.etudiants.map((etudiant, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{etudiant.nom}</TableCell>
                                            <TableCell>
                                                <Checkbox checked={etudiant.aDepose} disabled />
                                            </TableCell>
                                            <TableCell>{etudiant.dateDepot}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleCRDeposit(etudiant)}>Telecharger</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )}
            </Grid>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Ajouter un compte rendu</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        label="Titre"
                        fullWidth
                        value={newCR.titre}
                        name="titre"
                        onChange={handleNewCRChange}
                    />
                    <TextField
                        margin="normal"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={newCR.description}
                        name="description"
                        onChange={handleNewCRChange}
                    />
                    <TextField
                        margin="normal"
                        label="Deadline"
                        type="date"
                        fullWidth
                        value={newCR.deadline}
                        name="deadline"
                        onChange={handleNewCRChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <input
                        accept="application/pdf"
                        id="pdf-upload"
                        type="file"
                        onChange={handlePDFUpload}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="pdf-upload">
                        <Button variant="contained" component="span" color="primary" style={{ marginTop: '20px' }}>
                            Ajouter un fichier PDF
                        </Button>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Annuler</Button>
                    <Button onClick={handleAddCR} variant="contained" color="primary">Ajouter</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CompteRenduPage;
