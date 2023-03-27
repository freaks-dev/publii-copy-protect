class CopyProtectPlugin {
	constructor (API, name, config) {
		this.API = API;
		this.name = name;
		this.config = config;
	}

	addInsertions () {
		this.API.addInsertion('publiiHead', this.addHeadCode, 1, this);
	}

	addHeadCode (rendererInstance) {
		let scriptToLoad = '';

		if (!rendererInstance.previewMode || this.config.previewMode) {
			scriptToLoad = `
			    <script>
				    document.addEventListener('${this.config.disableCopy}', function(e) {
					    e.preventDefault(); // prevent the default copy behavior
					    var randomText = "${this.config.randomText}"; // define the random text
					    e.clipboardData.setData('text/plain', randomText); // set the clipboard data to the random text
				      });
					document.addEventListener('${this.config.disableRightClick}', function(e) {
                        e.preventDefault(); // prevent the default right-click menu from showing
                        alert('${this.config.disableRightClickText}'); // show your custom message
                    });
				</script>
			`;
		}

		return scriptToLoad;
	}

}

module.exports = CopyProtectPlugin;