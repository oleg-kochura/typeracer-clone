window.onload = () => {

	const textEl = document.querySelector('.text');
	const inputEl = document.querySelector('.user-input');
	const tooltip = document.querySelector('.custom-tooltip');
	const clearBtn = document.querySelector('.clear-btn');
	const text = textEl.innerHTML;

	let inputText = '',
			isError = false;


	inputEl.addEventListener('input', handleInputChange);
	clearBtn.addEventListener('click', clear);


	function handleInputChange(e) {
		let value = inputText + e.target.value,
			matchArr = findMatchedChars(text, value),
			nonMatchedLen = value.length - matchArr.length;

		let regex = new RegExp(`(${matchArr.join('')})(.{${nonMatchedLen}})`);

		textEl.innerHTML = text.replace(regex, "<span class='green'>$1</span><span class='error'>$2</span>");

		if (!nonMatchedLen && e.data === ' ') {
			inputText += e.target.value;
			inputEl.value = '';
		}

		isError = Boolean(nonMatchedLen);
		handleError();

	}


	function findMatchedChars (original, search) {
		let matchArr = [],
			i = 0;

		while (search[i] === original[i]) {
			matchArr.push(search[i]);
			i++;
		}

		return matchArr;
	}

	function handleError() {
		if (isError) {
			inputEl.classList.add('error');
			tooltip.classList.add('visible');
		} else {
			inputEl.classList.remove('error');
			tooltip.classList.remove('visible');
		}
	}

	function clear() {
		inputText = [];
		inputEl.value = '';
		textEl.innerHTML = text;
		isError = false;
		handleError();
	}

};