jQuery(document).ready(function($) {
	



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
			if($(element).attr('value') ==='') $(element).attr('value', defaultText);
		},

		// Функция, которая убирает текст по умолчанию при необходимости
		focus: function(element, defaultText) {
			if($(element).attr('value') === defaultText) $(element).attr('value', '');
		}
	}



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



