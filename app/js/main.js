jQuery(document).ready(function($) {
	


	/* Функция которая принемает название класса и создаёт объект с его данными */
	function initHTMLObject(blockName) {
		this.name = blockName,
		this.className = `.${blockName}`,
		this.activeName = `${blockName}--active`
	}



	/* Инициализация объектов для HTML-блоков */
	let Nav = new initHTMLObject('nav'); /* !!! Название класса без точки !!! */
	let Burger = new initHTMLObject('burger'); /* !!! Название класса без точки !!! */
	let LoadingBlock = new initHTMLObject('loading'); /* !!! Название класса без точки !!! */



	/* Объект с методами для блока навигации */
	let NavFun = {
		
		/* Метод, который определяет окрыт ли блок Навигации */
		isOpen: function() {
			let isOpen = $(Nav.className).hasClass(Nav.activeName);
			if (isOpen) {
				return true;
			} else {
				return false;
			}
		},
		
		/* Метод, который открывает блок Навигации */
		showNav: function() {
			$(Nav.className).addClass(Nav.activeName);
			$(Burger.className).addClass(Burger.activeName);
		},

		/* Метод, который закрывает блок Навигации */
		hideNav: function() {
			$(Nav.className).removeClass(Nav.activeName);
			$(Burger.className).removeClass(Burger.activeName);
		}

	}



	/* Обработка нажатия на "бургер" */
	$(Burger.className).on('click', function(event) {
		event.preventDefault();
		
		/* Открывает или закрывает блок Навигации */
		if (!NavFun.isOpen()) {
			NavFun.showNav();
		} else {
			NavFun.hideNav();
		}
	});



	/* Объекту LoadingBlock добавляется метод, который закрывает этот блок с учётом скорости и задержки */
	LoadingBlock.hideBlock = function(speed = 400, delay = 0) {
		setTimeout(function() {
			$(LoadingBlock.className).fadeOut(speed);
		}, delay )
	}

	/* Закрывает блок Загрузки */
	LoadingBlock.hideBlock();



	/* Функции связанные с навигацией */
	let LinksFun = {
		hrefInit: function(linkBlock) {
			return $(linkBlock).attr('href');
		},
		scrollToBlock: function(hrefToBlock, marginTop = 0, speed = 1000) {
			$('html, body').animate({
				scrollTop: $(hrefToBlock).offset().top - marginTop
			}, speed); 
		},
	}

	/* Обработка клика на кнопу навиции с сылкой на блок */
	$('.nav__link').on('click', function(event) {
		event.preventDefault();

		/* Инициализация ссылки к блоку элемента */
		let href = LinksFun.hrefInit($(this));

		/* Прокрутка до определенного блока с указаной скоростью */
		LinksFun.scrollToBlock(href);

		/* Зыкрывает блок Навигации */
		NavFun.hideNav();
	});



	/* Объект с методами для Форм для ввода */
	let Form = {
		
		 // Проверяет длину формы ввода
		checkLength: function(inputValue, minLength, maxLength) {
			let string = jQuery.trim(inputValue);

			let stringLength = string.length;

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
		showBug: function(errorName = "*****", errorText = "*****", typeMsg = "###") {
			
			// Начальный заголовок и тест для сообщения
			let msgTitle = '';
			let msgText = '   ↪ ' + errorText;
			
			// Иконки для сообщений
			let error = '❌';
			let warning = '❓';
			let success = '✅';

			// Задаёт иконки для заголовка сообщения
			if (typeMsg === 'error') {
				msgTitle = error + ' ' + errorName;
			} else if (typeMsg === "warning") {
				msgTitle = warning + ' ' + errorName;
			} else if (typeMsg === "success") {
				msgTitle = success + ' ' + errorName;
			} else {
				msgTitle = typeMsg + ' ' + errorName;
			}

			// Выводит заголовок и текст сообщения
			console.log(msgTitle);
			console.log(msgText);
		}
	}

	Debug.showBug("Ошибка", "Текст для тестовой ошибки", "error")
	Debug.showBug("Успех", "Текст для тестового успешного действия", "success")

});