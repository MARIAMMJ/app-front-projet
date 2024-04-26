import React, { useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, TextField, Box } from '@mui/material';
import { Close } from '@mui/icons-material';


const SupportCours = () => {
    const [selectedFiliere, setSelectedFiliere] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddCourseDialog, setOpenAddCourseDialog] = useState(false);
    const [titre, setTitre] = useState('');
    const [chapitre, setChapitre] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [filieresData, setFilieresData] = useState([
        { id: 1, nom: 'Filiere 1', cours: [
            { id: 1, titre: 'Cours 1 Filiere 1', chapitre: 'Chapitre 1', pdfUrl: '/chemin/vers/pdf1.pdf' },
            { id: 2, titre: 'Cours 2 Filiere 1', chapitre: 'Chapitre 1', pdfUrl: '/chemin/vers/pdf2.pdf' },
            // Ajoutez d'autres cours pour la filière 1
        ]},
        { id: 2, nom: 'Filiere 2', cours: [
            { id: 3, titre: 'Cours 1 Filiere 2', chapitre: 'Chapitre 2', pdfUrl: '/chemin/vers/pdf3.pdf' },
            // Ajoutez d'autres cours pour la filière 2
        ]},
        // Ajoutez d'autres filières au besoin
    ]);

    const handleFiliereChange = (event) => {
        setSelectedFiliere(event.target.value);
    };

    const handleDeleteCourse = () => {
        const updatedFilieres = filieresData.map(filiere => {
            if (filiere.id === selectedFiliere) {
                return { 
                    ...filiere, 
                    cours: filiere.cours.filter(course => course.id !== selectedCourse.id) 
                };
            }
            return filiere;
        });

        setFilieresData(updatedFilieres);
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = (course) => {
        setSelectedCourse(course);
        setOpenDeleteDialog(true);
    };

    const handleAddCourse = () => {
        setOpenAddCourseDialog(true);
    };

    const handleSaveCourse = () => {
        // Ajouter le nouveau cours à la filière sélectionnée
        const newCourse = {
            id: filieresData[selectedFiliere - 1].cours.length + 1,
            titre: titre,
            chapitre: chapitre,
            pdfUrl: '/chemin/vers/pdf4.pdf' // Modifier pour obtenir l'URL du fichier PDF téléchargé
        };

        const updatedFilieres = filieresData.map(filiere => {
            if (filiere.id === selectedFiliere) {
                return { 
                    ...filiere, 
                    cours: [...filiere.cours, newCourse]
                };
            }
            return filiere;
        });

        setFilieresData(updatedFilieres);
        setOpenAddCourseDialog(false);
        // Réinitialiser les valeurs des champs
        setTitre('');
        setChapitre('');
        setPdfFile(null);
    };

    return (
        <Container>
            <Select value={selectedFiliere} onChange={handleFiliereChange} style={{ marginBottom: '20px',marginTop:'20px' }}>
                <MenuItem value={''}>Sélectionner une filière</MenuItem>
                {filieresData.map((filiere) => (
                    <MenuItem key={filiere.id} value={filiere.id}>{filiere.nom}</MenuItem>
                ))}
            </Select>
            {selectedFiliere && (
                <div style={{marginTop:'-30px', marginBottom: '10px', marginLeft:'10px', textAlign:'right'}}>
                    <Button variant="contained" color="primary" onClick={handleAddCourse}>
                        Ajouter un autre cours
                    </Button>
                </div>
            )}
            {selectedFiliere && (
                <Grid container spacing={3}>
                    {filieresData.find(filiere => filiere.id === selectedFiliere).cours.map((cours) => (
                        <Grid item key={cours.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent style={{ position: 'relative' }}>
                                    <IconButton 
                                        style={{ position: 'absolute', top: 0, right: 0 }}
                                        onClick={() => handleConfirmDelete(cours)}
                                    >
                                        <Close />
                                    </IconButton>
                                    <Typography variant="h5" component="h2">
                                        {cours.titre}
                                    </Typography>
                                    <Typography color="textSecondary" style={{ marginTop: '10px' }}>
                                        {cours.chapitre}
                                    </Typography>
                                    <Button variant="contained" color="primary" href={cours.pdfUrl} download style={{ marginTop: '10px' }}>
                                        Télécharger
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    Êtes-vous sûr de vouloir supprimer ce cours ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleDeleteCourse} color="primary">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openAddCourseDialog} onClose={() => setOpenAddCourseDialog(false)}>
                <DialogTitle>Ajouter un nouveau cours</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Titre du cours"
                        fullWidth
                        margin="normal"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                    />
                    <TextField
                        label="Chapitre"
                        fullWidth
                        margin="normal"
                        value={chapitre}
                        onChange={(e) => setChapitre(e.target.value)}
                    />
                    <Box mt={2}>
                        <Button variant="contained" component="label">
                            Choisir un fichier
                            <input type="file" hidden onChange={(e) => setPdfFile(e.target.files[0])} />
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddCourseDialog(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleSaveCourse} color="primary">
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default SupportCours;
