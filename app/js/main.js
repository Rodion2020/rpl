	/* Функция которая принемает название класса и создаёт объект с его данными */
	function initHTMLObject(blockName) {

		// Присваивает имя блока
		this.name = blockName,

		// Присваивает название класса блока
		this.className = `.${blockName}`,

		// Присваивает название активного класса блока
		this.activeName = `${blockName}--active`
	}



	/* Инициализация блока загрузки страницы по классу без точки */
	let LoadingBlock = new initHTMLObject('loading'); /* !!! Название класса без точки !!! */

	/* Объекту LoadingBlock добавляется метод, который закрывает этот блок с учётом скорости и задержки */
	LoadingBlock.hideBlock = function(speed = 400, delay = 0) {
		setTimeout(function() {
			$(LoadingBlock.className).fadeOut(speed);
		}, delay )
	}

	/* Закрывает блок Загрузки */
	LoadingBlock.hideBlock();



	/* Нажатие на ссылку для показатия и скрытия блока */
	$('.content__more-link').on('click', function(event) {
		event.preventDefault();

		// Скрытие и показ блока по вызову метода
		FuntionsForLinks.toggleBlockByLink('.content__more-link', '.content__more-info', 1000, 'Show the Text', 'Hide the Text');
	});


	/* Обработка клика на блок с ссыклкой на блок */
	$('.nav__link').on('click', function(event) {
		event.preventDefault();

		 // Инициализация ссылки к блоку элемента 
		let href = FuntionsForLinks.hrefInit($(this));

		 // Прокрутка до определенного блока с указаной скоростью 
		FuntionsForLinks.scrollToBlock(href);

		 // Зыкрывает блок Навигации 
		NavFun.hideNav();
	});



	// Обработка фокусировки на строке ввода
	$('.form__input').on('focus', function(event) {
		Form.focus(this, 'Default text...')
	});
	
	// Обработка расфокусировки на строке ввода
	$('.form__input').on('blur', function(event) {
		Form.blur(this, 'Default text...')
	});






});