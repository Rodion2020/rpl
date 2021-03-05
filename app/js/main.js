jQuery(document).ready(function($) {
	


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
	let Nav = new initHTMLObject('nav'); /* !!! Название класса без точки !!! */

	/* Объект с методами для блока навигации */
	let NavFun = {
		
		// Метод, который определяет окрыт ли блок Навигации 
		isOpen: function() {
			let isOpen = $(Nav.className).hasClass(Nav.activeName);
			if (isOpen) {
				return true;
			} else {
				return false;
			}
		},
		
		// Метод, который открывает блок Навигации 
		showNav: function() {
			$(Nav.className).addClass(Nav.activeName);
			$(Burger.className).addClass(Burger.activeName);
		},

		// Метод, который закрывает блок Навигации 
		hideNav: function() {
			$(Nav.className).removeClass(Nav.activeName);
			$(Burger.className).removeClass(Burger.activeName);
		}

	}



	/* Инициализация блока загрузки страницы по классу без точки */
	let Burger = new initHTMLObject('burger'); /* !!! Название класса без точки !!! */

	/* Обработка нажатия на "бургер" */
	$(Burger.className).on('click', function(event) {
		event.preventDefault();
		
		// Открывает или закрывает блок Навигации 
		if (!NavFun.isOpen()) {
			NavFun.showNav();
		} else {
			NavFun.hideNav();
		}
	});



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



	/* Объект с функциями для ссылок */
	let FuntionsForLinks = {

		// Инициализация ссылки блока
		hrefInit: function(linkBlock) {
			return $(linkBlock).attr('href');
		},
	
		// Скролл до блока по ссылке до блока
		scrollToBlock: function(hrefToBlock, marginTop = 0, speed = 1000) {
			$('html, body').animate({
				scrollTop: $(hrefToBlock).offset().top - marginTop
			}, speed); 
		},

		// Выведение блока по нажатию по ссылке
		showBlockByLink: function(linkId, blockId, speed = 1000, textForLink = 'Hide') {
			var txt = textForLink;
			
			$(linkId).text(txt);
			$(blockId).slideDown(speed);
		},
		
		// Скрытие блока по нажатию по ссылке
		hideBlockByLink: function(linkId, blockId, speed = 1000, textForLink = 'Show') {
			var txt = textForLink;
			
			$(linkId).text(txt);
			$(blockId).slideUp(speed);
		},
		
		// Выведение и скрытие блока по нажатию по ссылке
		toggleBlockByLink: function(linkId, blockId, speed = 1000, textWhenHidden = 'Show', textWhenShowed = 'Hide') {
			var txt = $(blockId).is(':visible') ? textWhenHidden : textWhenShowed;
			
			$(linkId).text(txt);
			$(blockId).slideToggle(speed);
		}
	}

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



	/* Объект с методами для Форм для ввода */
	let Form = {
		
		 // Проверяет длину формы ввода
		checkLength: function(inputValue, minLength, maxLength) {

			// Удаляет пробелы по краям строки 
			let string = jQuery.trim(inputValue);

			// Получает длину строки
			let stringLength = string.length;

			// Проверяет длину строки
			if (stringLength >= minLength && stringLength <= maxLength)
				return true;
			else
				return false
		},

		// Функция, которая выводит текст по умолчанию при необходимости
		blur: function(element, defaultText) {
			if($(element).attr('value')=='') $(element).attr('value', defaultText);
		},

		// Функция, которая убирает текст по умолчанию при необходимости
		focus: function(element, defaultText) {
			if($(element).attr('value') == defaultText) $(element).attr('value', '');
		}
	}



	// Обработка фокусировки на строке ввода
	$('.form__input').on('focus', function(event) {
		Form.focus(this, 'Default text...')
	});
	
	// Обработка расфокусировки на строке ввода
	$('.form__input').on('blur', function(event) {
		Form.blur(this, 'Default text...')
	});



	/* Объект для обработки ошибок */
	let Debug = {

		// Метод, который выводит сообщение в консоль
		reportAboutEvent: function(errorName = false, errorText = false, success = false) {
			
			// Начальный заголовок и тест для сообщения
			let msgTitle = '';
			let msgText = '   ↪ ' + errorText;
			
			// Иконки для сообщений
			let errorIcon = '❌';
			let successIcon = '✅';

			// Задаёт иконки для заголовка сообщения
			if (success)
				msgTitle = successIcon + ' ' + errorName;
			else
				msgTitle = errorIcon + ' ' + errorName;

			// Выводит заголовок и текст сообщения
			console.log(msgTitle);
			console.log(msgText);
		}
	}




});