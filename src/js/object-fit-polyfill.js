function ObjectFitPolyfill(selector) {
	this.elementStyles = {
		position: 'absolute',
		minWidth: '100%',
		minHeight: '100%',
		maxWidth: 'none',
		maxHeight: 'none',
		width: 'auto',
		height: 'auto',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '0'
	}
	this.parentStyles = {
		overflow: 'hidden'
	}

	this.fitObjects = function() {
		var elements = document.querySelectorAll('.object-fit');
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i],
				elementWidth = element.videoWidth || element.naturalWidth,
				elementHeight = element.videoHeight || element.naturalHeight,
				parent = element.parentElement,
				parentBoundingRect = parent.getBoundingClientRect(),
				parentWidth = parentBoundingRect.width,
				parentHeight = parentBoundingRect.height;

			if (elementWidth > parentWidth && elementHeight > parentHeight) {
				element.style.minWidth = 'none';
				element.style.minHeight = 'none';

				var elementAspectRatio = elementWidth / elementHeight,
					parentAspectRatio = parentWidth / parentHeight;
				if (elementAspectRatio <= parentAspectRatio) {
					element.style.maxWidth = '100%';
					element.style.maxHeight = 'none';
				} else {
					element.style.maxWidth = 'none';
					element.style.maxHeight = '100%';
				}
			} else {
				element.style.minWidth = '100%';
				element.style.minHeight = '100%';
				element.style.maxWidth = 'none';
				element.style.maxHeight = 'none';
			}
		}
	}

	this.constructor = function() {
		var elements = document.querySelectorAll(selector);
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i],
				parent = element.parentElement;
			element.classList.add('object-fit');
			for (var j = 0; j < Object.keys(this.elementStyles).length; j++) {
				var key = Object.keys(this.elementStyles)[j];
				element.style[key] = this.elementStyles[key];
			}
			for (var k = 0; k < Object.keys(this.parentStyles).length; k++) {
				var key = Object.keys(this.parentStyles)[k];
				parent.style[key] = this.parentStyles[key];
			}
			if (!parent.style.position || parent.style.position == 'static') {
				parent.style.position = 'relative';
			}
			element.addEventListener('loadedmetadata', this.fitObjects);
		}

		this.fitObjects();
		window.addEventListener('resize', this.fitObjects.bind(this));
	}

	this.constructor();
}