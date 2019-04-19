function encryptCaesar(){

	  var word = document.getElementById('PlainInput').value;
	  var shift = document.getElementById('shift').value;

	  
	  if (shift = parseInt(shift)){


		var output = '';

		//Loop through each character
		for (var i = 0; i < word.length; i++){

		  var letter = word[i];
        //if text is a letter
		// instead of using alphabet array, uses ascii character codes to shift the letters
		  if (letter.match(/^[A-Za-z]+$/)){

			var letter_code = letter.charCodeAt(0);

			
			//for lowercase letters
			  if ((letter_code >= 97) && (letter_code <=122)) {
				letter_code = (((letter_code - 97 + shift) % 26) + 97)
			  }
			  
			  // for uppercase letters
			  if ((letter_code >= 65) && (letter_code <= 90)) {
				letter_code = (((letter_code - 65 + shift) % 26) + 65);
			  }  

			letter = String.fromCharCode(letter_code);

		  }

		  output += letter;

		}

		console.log(output);
		document.getElementById('CaesarOutput').value = output;
	  }


	}