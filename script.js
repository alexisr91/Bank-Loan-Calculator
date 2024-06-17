document.getElementById('formulaire').addEventListener('submit',function(e){

	document.getElementById('resultats').style.display = 'none';

	document.getElementById('chargement').style.display = 'block';

	setTimeout(calculResultats,2000);
	e.preventDefault();
});

function calculResultats(e){

	const montant = document.getElementById('montant');
	const interets = document.getElementById('interet');
	const annees = document.getElementById('annees');
	const paimentMensuel = document.getElementById('paiement-mensuel');
	const montantTotal = document.getElementById('montant-total');
	const coutInterets = document.getElementById('montant-interet');


	const montantDecimal = parseFloat(montant.value);

	const calculInteret = parseFloat(interet.value)/ 100 / 12; 


	const calculPaiements = parseFloat(annees.value)*12;

	// Calcul

	const x = Math.pow(1 + calculInteret, calculPaiements) // Pas compris l'interet du +1 dans les parametres
	const mensuel = (montantDecimal * x * calculInteret) / (x-1);


	if(isFinite(mensuel)){

		paimentMensuel.value = mensuel.toFixed(2);
		montantTotal.value = ( mensuel * calculPaiements).toFixed(2);
		coutInterets.value = (mensuel * calculPaiements) - montantDecimal.toFixed(2);

		document.getElementById('resultats').style.display = 'block';

		document.getElementById('chargement').style.display = 'none';

	}else{
		showError('Merci de vérifier votre saisie');
	}


	e.preventDefault(); // avec ou sans prevent default je ne peux pas genere de message d'erreur
}

function showError(error){ // 

	document.getElementById('resultats').style.display = 'none';

	document.getElementById('chargement').style.display = 'none';
	const errorDiv = document.createElement('div');
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');
	errorDiv.className = 'alert alert-danger';
	errorDiv.appendChild(document.createTextNode(error));

	card.insertBefore(errorDiv, heading);

	setTimeout(clearError,3000);

}



function clearError(){
	document.querySelector('.alert').remove();
}



// COmment saisir des nombres à virgule et enlever les valeurs saisies dans les champs lors de l'actualisation de la page 