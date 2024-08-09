import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCVComponent {
  cvForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cvForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      formations: this.fb.array([]),
      experiences: this.fb.array([]),
      competences: this.fb.array([])
    });
  }

  get formations() {
    return this.cvForm.get('formations') as FormArray;
  }

  get experiences() {
    return this.cvForm.get('experiences') as FormArray;
  }

  get competences() {
    return this.cvForm.get('competences') as FormArray;
  }

  ajouterFormation() {
    this.formations.push(this.fb.group({
      diplome: ['', Validators.required],
      etablissement: ['', Validators.required],
      annee: ['', Validators.required]
    }));
  }

  ajouterExperience() {
    this.experiences.push(this.fb.group({
      poste: ['', Validators.required],
      entreprise: ['', Validators.required],
      debut: ['', Validators.required],
      fin: [''],
      description: ['']
    }));
  }

  ajouterCompetence() {
    this.competences.push(this.fb.control('', Validators.required));
  }

  supprimerFormation(index: number) {
    this.formations.removeAt(index);
  }

  supprimerExperience(index: number) {
    this.experiences.removeAt(index);
  }

  supprimerCompetence(index: number) {
    this.competences.removeAt(index);
  }
  telechargerPDF() {
    const doc = new jsPDF();
    const cv = this.cvForm.value;
    let yPos = 20;

    // Fonction utilitaire pour ajouter du texte avec retour à la ligne
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * lineHeight);
    };

    // En-tête avec couleur de fond
    doc.setFillColor(59, 130, 246); // Couleur bleue de Tailwind
    doc.rect(0, 0, 210, 40, 'F');
    
    // Nom et prénom
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    yPos = addWrappedText(`${cv.prenom || 'Prénom'} ${cv.nom || 'Nom'}`, 10, yPos, 190, 10);

    // Informations de contact
    doc.setFontSize(12);
    yPos = addWrappedText(`${cv.email || 'email@exemple.com'} | ${cv.telephone || '+33 1 23 45 67 89'}`, 10, yPos + 5, 190, 5);

    // Réinitialiser la couleur du texte
    doc.setTextColor(0, 0, 0);

    // Formations
    yPos += 10;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Formations', 10, yPos);
    doc.line(10, yPos + 1, 200, yPos + 1);
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    if (cv.formations.length > 0) {
      cv.formations.forEach((formation: any) => {
        doc.setFont('helvetica', 'bold');
        yPos = addWrappedText(`${formation.diplome || 'Diplôme'}`, 10, yPos, 190, 5);
        doc.setFont('helvetica', 'normal');
        yPos = addWrappedText(`${formation.etablissement || 'Établissement'} | ${formation.annee || 'Année'}`, 10, yPos, 190, 5);
        yPos += 5;
      });
    } else {
      yPos = addWrappedText('Aucune formation renseignée', 10, yPos, 190, 5);
    }

    // Expériences professionnelles
    yPos += 10;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Expériences professionnelles', 10, yPos);
    doc.line(10, yPos + 1, 200, yPos + 1);
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    if (cv.experiences.length > 0) {
      cv.experiences.forEach((experience: any) => {
        doc.setFont('helvetica', 'bold');
        yPos = addWrappedText(`${experience.poste || 'Poste'} - ${experience.entreprise || 'Entreprise'}`, 10, yPos, 190, 5);
        doc.setFont('helvetica', 'italic');
        yPos = addWrappedText(`${experience.debut || 'Date de début'} - ${experience.fin || 'Date de fin'}`, 10, yPos, 190, 5);
        doc.setFont('helvetica', 'normal');
        yPos = addWrappedText(experience.description || 'Description du poste...', 10, yPos, 190, 5);
        yPos += 5;
      });
    } else {
      yPos = addWrappedText('Aucune expérience renseignée', 10, yPos, 190, 5);
    }

    // Compétences
    yPos += 10;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Compétences', 10, yPos);
    doc.line(10, yPos + 1, 200, yPos + 1);
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    if (cv.competences.length > 0) {
      const competencesText = cv.competences.join(', ');
      yPos = addWrappedText(competencesText, 10, yPos, 190, 5);
    } else {
      yPos = addWrappedText('Aucune compétence renseignée', 10, yPos, 190, 5);
    }

    // Sauvegarde du PDF
    doc.save('mon_cv.pdf');
  }


}
