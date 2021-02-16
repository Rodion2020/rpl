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



	$('.nav__link').on('click', function(event) {
		event.preventDefault();

		/* Инициализация ссылки к блоку элемента */
		let href = LinksFun.hrefInit($(this));

		/* Прокрутка до определенного блока с указаной скоростью */
		LinksFun.scrollToBlock(href);

		/* Зыкрывает блок Навигации */
		NavFun.hideNav();
	});




});